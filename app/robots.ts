import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

// Served at /robots.txt. Everything stays crawlable: private pages (sign-in,
// My Seminars, watch, QR verification) are excluded with noindex instead, which
// crawlers can only see if they're allowed to fetch the page.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
