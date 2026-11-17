"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import type { CustomerSeminar } from "@/types";
import { apiFetch, loginPath, mediaUrl, seminarWatchPath } from "@/lib/seminar-api";
import SeminarCard from "./seminar-card";
import { outlineButton } from "./seminar-access";

type State =
  | { kind: "loading" }
  | { kind: "ready"; seminars: CustomerSeminar[] }
  | { kind: "error" };

const LOGIN = loginPath("/my-seminars");

export default function MySeminars() {
  const { status, user } = useAuth();
  const router = useRouter();
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace(LOGIN);
      return;
    }
    if (status !== "authenticated") return;

    let cancelled = false;
    apiFetch("/api/customers/me/seminars", { cache: "no-store" })
      .then(async (res) => {
        if (res.status === 401) {
          router.replace(LOGIN);
          return;
        }
        if (!res.ok) throw new Error(String(res.status));
        const seminars: CustomerSeminar[] = await res.json();
        if (!cancelled) setState({ kind: "ready", seminars });
      })
      .catch(() => {
        if (!cancelled) setState({ kind: "error" });
      });
    return () => {
      cancelled = true;
    };
  }, [status, router]);

  return (
    <div className="flex flex-col gap-10">
      <div className="max-w-2xl" data-aos="fade-up">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-gray-500">
          My Seminars
        </p>
        <h1 className="text-3xl font-light leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
          Your Seminars
        </h1>
        {user && (
          <p className="mt-5 text-base text-gray-500">Signed in as {user.email}</p>
        )}
      </div>

      {state.kind === "loading" && (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="aspect-video w-full animate-pulse bg-gray-100" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
            </div>
          ))}
        </div>
      )}

      {state.kind === "error" && (
        <p className="py-16 text-center text-gray-500">
          Your seminars couldn&apos;t be loaded right now. Please try again later.
        </p>
      )}

      {state.kind === "ready" && state.seminars.length === 0 && (
        <div className="flex flex-col items-center gap-5 py-16 text-center">
          <p className="text-gray-500">You haven&apos;t purchased any seminars yet.</p>
          <Link href="/seminars" className={outlineButton}>
            Browse seminars
          </Link>
        </div>
      )}

      {state.kind === "ready" && state.seminars.length > 0 && (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {state.seminars.map((seminar) => (
            <SeminarCard
              key={seminar.id}
              href={seminarWatchPath(seminar.slug)}
              title={seminar.title}
              thumbnailUrl={mediaUrl(seminar.thumbnail)}
              thumbnailAlt={seminar.thumbnail?.alt}
              speaker={seminar.speaker}
              meta={seminar.duration}
              footer={
                <span className="text-sm font-medium text-gray-900">Watch now →</span>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
