import type { Metadata } from "next";
import LoginPanel from "@/components/seminars/login-panel";
import { safeNext } from "@/lib/seminar-api";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ next?: string; error?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const { next, error } = await searchParams;
  return <LoginPanel next={safeNext(next)} error={error ?? null} />;
}
