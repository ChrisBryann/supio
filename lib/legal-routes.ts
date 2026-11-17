// Website routes for legal-pages documents (internal rich-text links and
// "Baca juga"). Client-safe: no fetching here.
const LEGAL_ROUTES: Record<string, string> = {
  "privacy-policy": "/privacy-policy",
  terms: "/terms",
};

export function legalPagePath(slug: string) {
  return LEGAL_ROUTES[slug] ?? `/${slug}`;
}
