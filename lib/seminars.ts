import type { Seminar } from "@/types";
import { API_URL, apiHeaders } from "./seminar-api";

// Public catalogue reads (identical for every visitor, safe to cache/ISR).
// Customer-specific calls never go through here; they run in the browser.

// Returns null when the catalogue couldn't be loaded (so the page can show a
// message instead of failing the build).
export async function getSeminars(): Promise<Seminar[] | null> {
  if (!API_URL) return null;
  try {
    const res = await fetch(`${API_URL}/api/seminars?depth=1&limit=0`, {
      headers: apiHeaders(),
    });
    if (!res.ok) {
      console.error("[seminars] list fetch failed:", res.status);
      return null;
    }
    const data = await res.json();
    return data.docs ?? [];
  } catch (error) {
    console.error("[seminars] list fetch error:", error);
    return null;
  }
}

// null = no published seminar with this slug (render a 404). Network/server
// failures throw instead, so a transient outage isn't cached as a 404.
export async function getSeminarBySlug(slug: string): Promise<Seminar | null> {
  if (!API_URL) return null;
  const res = await fetch(
    `${API_URL}/api/seminars?where[slug][equals]=${encodeURIComponent(slug)}&limit=1&depth=1`,
    { headers: apiHeaders() }
  );
  if (!res.ok) {
    throw new Error(`[seminars] detail fetch failed: ${res.status}`);
  }
  const data = await res.json();
  return data.docs?.[0] ?? null;
}
