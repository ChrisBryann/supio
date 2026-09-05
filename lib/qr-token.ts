import crypto from "crypto";

/**
 * A scanned QR points to /verify/<code>, where <code> is:
 *
 *   base64url(JSON.stringify({ p: productId, s: serial })) + "." + signatureHex
 *
 * The payload is base64url-encoded (not carried as plain text) so a scanned
 * URL doesn't visibly expose the Accurate item number to whoever looks at it.
 *
 * signature = HMAC-SHA256(`${productId}.${serial}.${timestamp}`, QR_SIGNING_SECRET),
 * produced by whatever generates the QR codes (kept outside this app).
 * `timestamp` is not carried in the code - it's read back from Accurate's
 * serial-number-mutation record for (productId, serial) and used here to
 * recompute the signature, proving that record matches what was signed at
 * QR-generation time.
 */

export type QrPayload = {
  productId: string;
  serial: string;
  timestamp: string;
};

export type ParsedQrCode = {
  productId: string;
  serial: string;
  signature: string;
};

function getSigningSecret(): string {
  const secret = process.env.QR_SIGNING_SECRET;
  if (!secret) {
    throw new Error("QR_SIGNING_SECRET is not set");
  }
  return secret;
}

/** Decrypts/validates the opaque `code` path segment from a /verify/<code> URL. */
export function parseQrCode(code: string): ParsedQrCode | null {
  const separatorIndex = code.lastIndexOf(".");
  if (separatorIndex === -1) return null;

  const payloadB64 = code.slice(0, separatorIndex);
  const signature = code.slice(separatorIndex + 1);
  if (!payloadB64 || !signature) return null;

  try {
    const decoded = Buffer.from(payloadB64, "base64url").toString("utf8");
    const parsed = JSON.parse(decoded);
    if (typeof parsed.p !== "string" || typeof parsed.s !== "string") {
      return null;
    }
    return { productId: parsed.p, serial: parsed.s, signature };
  } catch {
    return null;
  }
}

/**
 * Recomputes the HMAC over `productId.serial.timestamp` (as looked up from
 * Accurate for the scanned serial) and compares it to the QR's signature.
 */
export function verifyQrSignature(
  payload: QrPayload,
  signature: string
): boolean {
  const expected = crypto
    .createHmac("sha256", getSigningSecret())
    .update(`${payload.productId}.${payload.serial}.${payload.timestamp}`)
    .digest("hex");

  const expectedBuf = Buffer.from(expected, "hex");
  let actualBuf: Buffer;
  try {
    actualBuf = Buffer.from(signature, "hex");
  } catch {
    return false;
  }
  if (expectedBuf.length !== actualBuf.length) return false;
  return crypto.timingSafeEqual(expectedBuf, actualBuf);
}
