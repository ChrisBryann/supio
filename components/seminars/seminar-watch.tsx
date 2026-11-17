"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import type { PlayResponse } from "@/types";
import { apiFetch, loginPath, purchaseOption, seminarWatchPath } from "@/lib/seminar-api";
import ProtectedPlayer from "./protected-player";
import { PurchaseButton, outlineButton, primaryButton } from "./seminar-access";

type State =
  | { kind: "loading" }
  | { kind: "ready"; data: PlayResponse; receivedAt: number; startTime?: number }
  | { kind: "not_purchased"; purchaseUrl: string | null }
  | { kind: "not_found" }
  | { kind: "rate_limited"; retryAfter: number }
  | { kind: "video_unavailable" }
  | { kind: "failed" }
  | { kind: "signed_out" };

// Give up refreshing tokens after this many attempts within a minute, so a
// persistent player error can't hammer the (rate-limited) /play endpoint.
const MAX_REFRESHES_PER_MINUTE = 3;

type Props = {
  slug: string;
  title: string;
  whatsappUrl?: string | null;
};

export default function SeminarWatch({ slug, title, whatsappUrl }: Props) {
  const router = useRouter();
  const { status } = useAuth();
  const [state, setState] = useState<State>({ kind: "loading" });
  const refreshTimes = useRef<number[]>([]);
  const statusRef = useRef(status);
  const wasAuthenticatedRef = useRef(false);
  const watchHref = seminarWatchPath(slug);

  // Signing out while watching: drop the player and its tokens at once (no
  // reload). Arriving signed out goes to sign-in, as a 401 from /play would.
  useEffect(() => {
    statusRef.current = status;
    if (status === "authenticated") {
      wasAuthenticatedRef.current = true;
    } else if (status === "unauthenticated") {
      if (wasAuthenticatedRef.current) {
        setState({ kind: "signed_out" });
      } else {
        router.replace(loginPath(watchHref));
      }
    }
  }, [status, router, watchHref]);

  // Must run in the browser: the watermark shows the IP the backend sees.
  // Tokens stay in memory only (React state) — never in storage or URLs.
  const load = useCallback(
    async (startTime?: number) => {
      let res: Response;
      try {
        res = await apiFetch(`/api/seminars/${encodeURIComponent(slug)}/play`, {
          cache: "no-store",
        });
      } catch {
        setState({ kind: "failed" });
        return;
      }

      // A response that lands after sign-out (e.g. a token refresh in flight)
      // must not bring the player back.
      const signedOut = () => statusRef.current === "unauthenticated";
      if (signedOut()) return;

      if (res.status === 401) {
        router.replace(loginPath(seminarWatchPath(slug)));
        return;
      }

      const body = await res.json().catch(() => ({}));
      if (signedOut()) return;
      switch (res.status) {
        case 200:
          setState({ kind: "ready", data: body, receivedAt: Date.now(), startTime });
          return;
        case 403:
          setState({ kind: "not_purchased", purchaseUrl: body.purchaseUrl ?? null });
          return;
        case 404:
          setState({ kind: "not_found" });
          return;
        case 429:
          // Retry-After is only readable cross-origin if the backend exposes
          // it; otherwise fall back to 30s.
          setState({
            kind: "rate_limited",
            retryAfter: Number(res.headers.get("Retry-After")) || 30,
          });
          return;
        case 503:
          setState({ kind: "video_unavailable" });
          return;
        default:
          setState({ kind: "failed" });
      }
    },
    [slug, router]
  );

  useEffect(() => {
    load();
  }, [load]);

  // Auto-retry after a rate limit.
  useEffect(() => {
    if (state.kind !== "rate_limited") return;
    const timer = setTimeout(() => load(), state.retryAfter * 1000);
    return () => clearTimeout(timer);
  }, [state, load]);

  const refreshTokens = useCallback(
    (currentTime: number) => {
      const now = Date.now();
      refreshTimes.current = refreshTimes.current.filter((t) => now - t < 60_000);
      if (refreshTimes.current.length >= MAX_REFRESHES_PER_MINUTE) {
        setState({ kind: "failed" });
        return;
      }
      refreshTimes.current.push(now);
      load(currentTime);
    },
    [load]
  );

  // Checked on render too, so the player is gone in the same frame the
  // signed-in flag flips.
  if (status === "unauthenticated" || state.kind === "signed_out") {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 border border-gray-200 bg-gray-50 px-6 text-center">
        <p className="text-lg text-gray-900">You&apos;re signed out.</p>
        <Link href={loginPath(watchHref)} className={primaryButton}>
          Sign in to watch
        </Link>
      </div>
    );
  }

  if (state.kind === "ready") {
    return (
      <ProtectedPlayer
        data={state.data}
        receivedAt={state.receivedAt}
        title={title}
        startTime={state.startTime}
        onNeedFreshTokens={refreshTokens}
      />
    );
  }

  if (state.kind === "loading") {
    return (
      <div className="flex aspect-video w-full animate-pulse items-center justify-center bg-gray-100 text-sm text-gray-500">
        Loading video…
      </div>
    );
  }

  const purchase =
    state.kind === "not_purchased"
      ? purchaseOption(state.purchaseUrl, whatsappUrl, title)
      : null;

  return (
    <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 border border-gray-200 bg-gray-50 px-6 text-center">
      {state.kind === "not_purchased" && (
        <>
          <p className="text-lg text-gray-900">You haven&apos;t purchased this seminar.</p>
          {purchase && <PurchaseButton option={purchase} className={primaryButton} />}
          <p className="max-w-sm text-sm text-gray-500">
            Bought it with a different email? Sign out and sign in with that email.
          </p>
        </>
      )}

      {state.kind === "not_found" && (
        <>
          <p className="text-lg text-gray-900">This seminar isn&apos;t available.</p>
          <Link href="/seminars" className={outlineButton}>
            Browse seminars
          </Link>
        </>
      )}

      {state.kind === "rate_limited" && (
        <p className="text-gray-700">
          Too many requests. Retrying in {state.retryAfter} seconds…
        </p>
      )}

      {state.kind === "video_unavailable" && (
        <>
          <p className="text-gray-700">
            The video isn&apos;t available right now. Please try again later.
          </p>
          <button type="button" onClick={() => load()} className={outlineButton}>
            Try again
          </button>
        </>
      )}

      {state.kind === "failed" && (
        <>
          <p className="text-gray-700">We couldn&apos;t load the video.</p>
          <button
            type="button"
            onClick={() => {
              refreshTimes.current = [];
              setState({ kind: "loading" });
              load();
            }}
            className={outlineButton}
          >
            Try again
          </button>
        </>
      )}
    </div>
  );
}
