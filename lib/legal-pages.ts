import { cache } from "react";
import type { CompanyInfo, LegalPage } from "@/types";
import { API_URL, apiHeaders } from "./seminar-api";
import { COMPANY } from "./company";

// Legal pages and company info live on the same Payload backend as seminars.
// Public, identical for every visitor: safe to cache/ISR.

// A hung backend shouldn't stall a build or an ISR regeneration.
const TIMEOUT_MS = 15_000;

// null = no published page with this slug (render a 404). Network/server
// failures throw instead, so an outage isn't cached as a 404 and ISR keeps
// serving the last good version. cache(): generateMetadata and the page share
// one request.
export const getLegalPage = cache(async (slug: string): Promise<LegalPage | null> => {
  if (!API_URL) return null;
  const res = await fetch(
    `${API_URL}/api/legal-pages?where[slug][equals]=${encodeURIComponent(slug)}&depth=1&limit=1`,
    { headers: apiHeaders(), signal: AbortSignal.timeout(TIMEOUT_MS) }
  );
  if (!res.ok) {
    throw new Error(`[legal-pages] fetch failed for "${slug}": ${res.status}`);
  }
  const data = await res.json();
  return data.docs?.[0] ?? null;
});

// Falls back to the built-in company details, so a missing or failing global
// never takes a legal page down.
export const getCompanyInfo = cache(async (): Promise<CompanyInfo> => {
  const fallback: CompanyInfo = {
    legalName: COMPANY.legalName,
    brandName: COMPANY.brand,
    address: COMPANY.address,
    whatsappUrl: process.env.WHATSAPP_URL ?? null,
    whatsappLabel: "Hubungi kami melalui WhatsApp resmi",
  };
  if (!API_URL) return fallback;
  try {
    const res = await fetch(`${API_URL}/api/globals/company-info`, {
      headers: apiHeaders(),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) {
      console.error("[company-info] fetch failed:", res.status);
      return fallback;
    }
    const data: Partial<CompanyInfo> = await res.json();
    return {
      legalName: data.legalName || fallback.legalName,
      brandName: data.brandName ?? fallback.brandName,
      address: data.address || fallback.address,
      whatsappUrl: data.whatsappUrl || fallback.whatsappUrl,
      whatsappLabel: data.whatsappLabel || fallback.whatsappLabel,
    };
  } catch (error) {
    console.error("[company-info] fetch error:", error);
    return fallback;
  }
});

const dateFormat = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

// "17 November 2026"
export function formatLegalDate(iso: string) {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? iso : dateFormat.format(date);
}
