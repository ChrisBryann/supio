// Canonical origin for absolute URLs (sitemap, robots). Set SITE_URL to the
// production domain (e.g. https://example.com, no trailing slash). On Vercel
// it falls back to the project's production domain.
export const SITE_URL = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3001")
).replace(/\/+$/, "");
