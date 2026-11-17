"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaYahoo } from "react-icons/fa";
import { useAuth } from "@/components/auth/auth-provider";
import { API_URL, oauthUrl } from "@/lib/seminar-api";

const ERROR_MESSAGES: Record<string, string> = {
  unverified:
    "Your Google/Yahoo email isn't verified. Verify it with Google/Yahoo and try again.",
  not_a_customer:
    "We couldn't find a purchase for this email. Sign in with the email you used to pay, or contact us.",
  account_mismatch:
    "This email is linked to a different Google/Yahoo account. Sign in with that account, or contact us.",
  google_failed: "Sign-in didn't complete. Please try again.",
  yahoo_failed: "Sign-in didn't complete. Please try again.",
};

const providerButton =
  "flex w-full items-center justify-center gap-3 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-900 transition hover:border-gray-900";

type Props = {
  next: string;
  error?: string | null;
};

export default function LoginPanel({ next, error }: Props) {
  const { status } = useAuth();
  const router = useRouter();

  // Already signed in: go straight to where they were heading.
  useEffect(() => {
    if (status === "authenticated") router.replace(next);
  }, [status, next, router]);

  const errorMessage = error
    ? ERROR_MESSAGES[error] ?? "Sign-in didn't complete. Please try again."
    : null;

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-8 py-8">
      <div data-aos="fade-up">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-gray-500">
          Seminar Access
        </p>
        <h1 className="text-3xl font-light leading-tight tracking-tight text-gray-900 sm:text-4xl">
          Sign in to watch
        </h1>
        <p className="mt-4 text-base leading-relaxed text-gray-500">
          Use the Google or Yahoo account with the email you used to purchase
          your seminar.
        </p>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {errorMessage}
        </div>
      )}

      {API_URL ? (
        <div className="flex flex-col gap-3">
          {/* Full-page navigations to the backend, not fetches. */}
          <a href={oauthUrl("google", next)} className={providerButton}>
            <FcGoogle className="h-5 w-5" />
            Continue with Google
          </a>
          <a href={oauthUrl("yahoo", next)} className={providerButton}>
            <FaYahoo className="h-5 w-5 text-[#6001D2]" />
            Continue with Yahoo
          </a>
          <p className="mt-2 text-center text-xs leading-relaxed text-gray-500">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-2 hover:text-gray-900">
              Terms &amp; Conditions
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-gray-900">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          Sign-in is temporarily unavailable. Please try again later.
        </p>
      )}
    </div>
  );
}
