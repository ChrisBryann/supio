"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { useAuth } from "@/components/auth/auth-provider";
import type { CustomerSeminar } from "@/types";
import {
  apiFetch,
  loginPath,
  purchaseOption,
  seminarWatchPath,
  type PurchaseOption,
} from "@/lib/seminar-api";

export const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-default disabled:opacity-60";
export const outlineButton =
  "inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white";

export function PurchaseButton({
  option,
  className,
}: {
  option: PurchaseOption;
  className: string;
}) {
  return (
    <Link href={option.href} target="_blank" rel="noopener noreferrer" className={className}>
      {option.via === "whatsapp" && <FaWhatsapp className="h-4 w-4" />}
      {option.via === "whatsapp" ? "Buy via WhatsApp" : "Buy seminar"}
    </Link>
  );
}

type Ownership = "checking" | "owned" | "not-owned" | "unknown";

type Props = {
  slug: string;
  title: string;
  purchaseUrl?: string | null;
  whatsappUrl?: string | null;
};

// Decides which call-to-action to show. Display only — the /play endpoint is
// the real access check, so a wrong guess here can't grant access.
export default function SeminarAccess({ slug, title, purchaseUrl, whatsappUrl }: Props) {
  const { status } = useAuth();
  const [ownership, setOwnership] = useState<Ownership>("checking");
  const watchHref = seminarWatchPath(slug);
  const purchase = purchaseOption(purchaseUrl, whatsappUrl, title);

  useEffect(() => {
    if (status !== "authenticated") return;
    let cancelled = false;
    setOwnership("checking");
    apiFetch("/api/customers/me/seminars", { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) throw new Error(String(res.status));
        const seminars: CustomerSeminar[] = await res.json();
        if (!cancelled) {
          setOwnership(seminars.some((s) => s.slug === slug) ? "owned" : "not-owned");
        }
      })
      .catch(() => {
        // Couldn't tell — let them try; /play will decide.
        if (!cancelled) setOwnership("unknown");
      });
    return () => {
      cancelled = true;
    };
  }, [status, slug]);

  if (status === "loading" || (status === "authenticated" && ownership === "checking")) {
    return (
      <button type="button" disabled className={primaryButton}>
        Checking access…
      </button>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-3">
          <Link href={loginPath(watchHref)} className={primaryButton}>
            Sign in to watch
          </Link>
          {purchase && <PurchaseButton option={purchase} className={outlineButton} />}
        </div>
        <p className="text-sm text-gray-500">
          Already purchased? Sign in with the email you used to pay.
        </p>
      </div>
    );
  }

  if (ownership === "owned" || ownership === "unknown") {
    return (
      <div>
        <Link href={watchHref} className={primaryButton}>
          Watch now
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {purchase ? (
        <div>
          <PurchaseButton option={purchase} className={primaryButton} />
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          This seminar isn&apos;t available for purchase yet.
        </p>
      )}
      <p className="text-sm text-gray-500">
        Bought it with a different email? Sign out and sign in with that email.
      </p>
    </div>
  );
}
