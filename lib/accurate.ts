import crypto from "crypto";

const ACCURATE_TOKEN_URL =
  process.env.ACCURATE_TOKEN_URL || "https://account.accurate.id/api/api-token.do";
const SERIAL_NUMBER_MUTATION_PATH = "/accurate/api/report/serial-number-mutation.do";
const ITEM_DETAIL_PATH = "/accurate/api/item/detail.do";

// Accurate recommends re-checking the host at least every 30 days; we cache
// it in memory (per warm server instance) for a day to stay well inside that
// while avoiding an extra /api-token.do round trip on every verification.
const HOST_TTL_MS = 24 * 60 * 60 * 1000;
let cachedHost: { host: string; fetchedAt: number } | null = null;

function getApiToken(): string {
  const token = process.env.ACCURATE_API_TOKEN;
  if (!token) throw new Error("ACCURATE_API_TOKEN is not set");
  return token;
}

function getSignatureSecret(): string {
  const secret = process.env.ACCURATE_SIGNATURE_SECRET;
  if (!secret) throw new Error("ACCURATE_SIGNATURE_SECRET is not set");
  return secret;
}

function buildAuthHeaders(): Record<string, string> {
  const timestamp = new Date().toISOString();
  const signature = crypto
    .createHmac("sha256", getSignatureSecret())
    .update(timestamp)
    .digest("base64");

  return {
    Authorization: `Bearer ${getApiToken()}`,
    "X-Api-Timestamp": timestamp,
    "X-Api-Signature": signature,
  };
}

async function resolveHost(): Promise<string> {
  if (cachedHost && Date.now() - cachedHost.fetchedAt < HOST_TTL_MS) {
    return cachedHost.host;
  }

  const response = await fetch(ACCURATE_TOKEN_URL, {
    method: "POST",
    headers: buildAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Accurate api-token.do failed: ${response.status}`);
  }

  const data = await response.json();
  const host = data?.d?.database?.host;
  if (!host) {
    throw new Error("Accurate api-token.do response missing host");
  }

  cachedHost = { host, fetchedAt: Date.now() };
  return host;
}

async function accurateGet(
  path: string,
  params: Record<string, string>
): Promise<any> {
  const host = await resolveHost();
  const url = new URL(path, host);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url.toString(), {
    headers: buildAuthHeaders(),
    // host can change; Accurate signals this via a 308 redirect to the
    // correct host, so we must follow it rather than fail.
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`Accurate ${path} failed: ${response.status}`);
  }

  return response.json();
}

/** Fetches a file served under Accurate's own host, which requires the same
 * signed auth headers as the API - a browser can't load it directly, so we
 * inline it as a data URI. */
async function fetchAccurateFileAsDataUri(path: string): Promise<string | null> {
  const host = await resolveHost();
  const url = new URL(path, host).toString();

  const response = await fetch(url, { headers: buildAuthHeaders() });
  if (!response.ok) return null;

  const contentType = response.headers.get("content-type") || "image/jpeg";
  const buffer = Buffer.from(await response.arrayBuffer());
  return `data:${contentType};base64,${buffer.toString("base64")}`;
}

export type StockRecord = {
  productId: string;
  productName: string;
  productImageDataUri: string | null;
  serial: string;
  timestamp: string;
};

/**
 * Confirms `serial` was issued against `productId` via Accurate's Item
 * Serial Number mutation report, then fetches that item's name/photo.
 * Returns null if no matching serial mutation exists for that item.
 */
export async function findStockRecord(
  productId: string,
  serial: string
): Promise<StockRecord | null> {
  if (!process.env.ACCURATE_API_TOKEN || !process.env.ACCURATE_SIGNATURE_SECRET) {
    console.warn(
      "[accurate] ACCURATE_API_TOKEN/ACCURATE_SIGNATURE_SECRET not configured - findStockRecord is stubbed"
    );
    return null;
  }

  const mutations = await accurateGet(SERIAL_NUMBER_MUTATION_PATH, {
    itemNo: productId,
    serialNumber: serial,
  });

  const match = (mutations?.d ?? []).find(
    (entry: any) => entry?.serialNumber?.number === serial
  );
  if (!match) return null;

  const detail = await accurateGet(ITEM_DETAIL_PATH, { no: productId });
  const item = detail?.d;
  if (!item) return null;

  const imagePath = item.detailItemImage?.[0]?.fileName ?? null;
  const productImageDataUri = imagePath
    ? await fetchAccurateFileAsDataUri(imagePath)
    : null;

  return {
    productId,
    productName: item.name,
    productImageDataUri,
    serial,
    timestamp: match.transaction.transactionDate,
  };
}
