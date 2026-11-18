import type { MetadataRoute } from "next";
import { API_URL, apiHeaders } from "@/lib/seminar-api";
import { legalPagePath } from "@/lib/legal-routes";
import { SITE_URL } from "@/lib/site-url";
import type { CacheTag } from "@/lib/cache-tags";

// Served at /sitemap.xml. Public, indexable pages only: sign-in, My Seminars,
// watch pages and QR verification pages are left out (and marked noindex).
export const revalidate = 86400;

const TIMEOUT_MS = 15_000;

type Doc = { id: string; slug?: string; updatedAt?: string };

// A failing source drops its entries instead of failing the whole sitemap.
async function fetchDocs(
  url: string,
  headers: Record<string, string>,
  tags: CacheTag[] = []
): Promise<Doc[]> {
  try {
    const res = await fetch(url, {
      headers,
      signal: AbortSignal.timeout(TIMEOUT_MS),
      next: { tags },
    });
    if (!res.ok) {
      console.error("[sitemap] fetch failed:", url.split("?")[0], res.status);
      return [];
    }
    const data = await res.json();
    return data.docs ?? [];
  } catch (error) {
    console.error("[sitemap] fetch error:", url.split("?")[0], error);
    return [];
  }
}

function cmsDocs(collection: "products" | "blogs") {
  if (!process.env.BACKEND_URL) return Promise.resolve([]);
  return fetchDocs(
    `https://${process.env.BACKEND_URL}/api/${collection}?limit=1000&depth=0&select[updatedAt]=true`,
    { "x-frontend-secret": process.env.PAYLOAD_FRONTEND_SHARED_SECRET || "" }
  );
}

function apiDocs(collection: "seminars" | "legal-pages") {
  if (!API_URL) return Promise.resolve([]);
  return fetchDocs(
    `${API_URL}/api/${collection}?limit=0&depth=0&select[slug]=true&select[updatedAt]=true`,
    apiHeaders(),
    [collection]
  );
}

function lastModified(doc: Doc) {
  return doc.updatedAt ? new Date(doc.updatedAt) : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, blogs, seminars, legalPages] = await Promise.all([
    cmsDocs("products"),
    cmsDocs("blogs"),
    apiDocs("seminars"),
    apiDocs("legal-pages"),
  ]);

  const url = (path: string) => `${SITE_URL}${path}`;

  return [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    { url: url("/products"), changeFrequency: "weekly", priority: 0.9 },
    ...products.map((p) => ({
      url: url(`/products/${encodeURIComponent(p.id)}`),
      lastModified: lastModified(p),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: url("/seminars"), changeFrequency: "weekly", priority: 0.8 },
    ...seminars
      .filter((s) => s.slug)
      .map((s) => ({
        url: url(`/seminars/${encodeURIComponent(s.slug!)}`),
        lastModified: lastModified(s),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    { url: url("/blogs"), changeFrequency: "weekly", priority: 0.7 },
    ...blogs.map((b) => ({
      url: url(`/blogs/${encodeURIComponent(b.id)}`),
      lastModified: lastModified(b),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: url("/partners"), changeFrequency: "monthly", priority: 0.6 },
    // Only published legal pages are returned, so unpublished ones stay out.
    ...legalPages
      .filter((l) => l.slug)
      .map((l) => ({
        url: url(legalPagePath(l.slug!)),
        lastModified: lastModified(l),
        changeFrequency: "yearly" as const,
        priority: 0.3,
      })),
  ];
}
