import type { SeminarThumbnail } from "@/types";

// Base URL of the Payload backend that handles customer sign-in, the seminar
// catalogue and playback. Safe to expose: it holds no secrets.
export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

// ngrok's free plan answers browser requests with an HTML warning page unless
// this header is present, so send it only when the API is an ngrok tunnel
// (local development). Production never gets the extra header.
const IS_NGROK = (() => {
  try {
    return /\.ngrok(-free)?\.(app|dev|io)$/i.test(new URL(API_URL).hostname);
  } catch {
    return false;
  }
})();

export function apiHeaders(extra?: Record<string, string>): Record<string, string> {
  return {
    ...(IS_NGROK ? { "ngrok-skip-browser-warning": "1" } : {}),
    ...extra,
  };
}

// Browser requests that need the customer's session cookie.
export function apiFetch(path: string, init: RequestInit = {}) {
  return fetch(`${API_URL}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      ...apiHeaders(),
      ...(init.headers as Record<string, string> | undefined),
    },
  });
}

// Only relative frontend paths are allowed as post-sign-in destinations, so a
// crafted ?next= can't bounce customers to another site.
export function safeNext(next: string | null | undefined, fallback = "/my-seminars") {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) {
    return fallback;
  }
  return next;
}

// Sign-in is a full-page navigation to the backend, not a fetch.
export function oauthUrl(provider: "google" | "yahoo", next?: string | null) {
  return `${API_URL}/api/customers/oauth/${provider}?next=${encodeURIComponent(safeNext(next))}`;
}

export function seminarWatchPath(slug: string) {
  return `/seminars/${encodeURIComponent(slug)}/watch`;
}

export function loginPath(next: string) {
  return `/login?next=${encodeURIComponent(next)}`;
}

export type PurchaseOption = { href: string; via: "whatsapp" | "link" };

// Seminars are sold over WhatsApp unless the CMS sets a dedicated purchase
// link. The WhatsApp chat opens prefilled with the seminar's title.
export function purchaseOption(
  purchaseUrl: string | null | undefined,
  whatsappUrl: string | null | undefined,
  title: string
): PurchaseOption | null {
  if (purchaseUrl) return { href: purchaseUrl, via: "link" };
  if (!whatsappUrl) return null;
  try {
    const url = new URL(whatsappUrl);
    url.pathname = url.pathname.replace(/\/+$/, "");
    url.searchParams.delete("text");
    // encodeURIComponent (spaces as %20), not URLSearchParams (spaces as "+"),
    // which some WhatsApp clients show literally.
    const message = encodeURIComponent(
      `Hi SCI Aesthetics, I'd like to purchase the seminar "${title}".`
    );
    return {
      href: `${url.toString()}${url.search ? "&" : "?"}text=${message}`,
      via: "whatsapp",
    };
  } catch {
    return { href: whatsappUrl, via: "whatsapp" };
  }
}

// Payload may return absolute or backend-relative media URLs.
export function mediaUrl(thumbnail: SeminarThumbnail | string | null | undefined) {
  if (!thumbnail || typeof thumbnail === "string" || !thumbnail.url) return null;
  return thumbnail.url.startsWith("http") ? thumbnail.url : `${API_URL}${thumbnail.url}`;
}
