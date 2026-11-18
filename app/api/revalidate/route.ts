import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { CACHE_TAGS, type CacheTag } from "@/lib/cache-tags";

// Called by the CMS after content changes (e.g. a seminar is published), so
// cached pages update right away instead of at their next periodic refresh.
//   POST /api/revalidate
//   Authorization: Bearer <REVALIDATE_SECRET>
//   { "tags": ["seminars"] }

function authorized(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) return false;
  const given = Buffer.from(request.headers.get("authorization") ?? "");
  const expected = Buffer.from(`Bearer ${secret}`);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

export async function POST(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const requested: unknown[] = Array.isArray(body?.tags) ? body.tags : [];
  const tags = requested.filter((tag): tag is CacheTag =>
    (CACHE_TAGS as readonly unknown[]).includes(tag)
  );
  if (tags.length === 0) {
    return NextResponse.json(
      { error: "no_valid_tags", allowed: CACHE_TAGS },
      { status: 400 }
    );
  }

  tags.forEach((tag) => revalidateTag(tag));
  return NextResponse.json({ revalidated: tags, now: Date.now() });
}
