// Cache tags on CMS fetches. The CMS asks /api/revalidate to clear one when
// that content changes; each page's `revalidate` stays as a fallback.
export const CACHE_TAGS = ["seminars", "legal-pages", "company-info"] as const;

export type CacheTag = (typeof CACHE_TAGS)[number];
