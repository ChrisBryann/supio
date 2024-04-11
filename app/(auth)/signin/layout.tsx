import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Supio - Sign in",
  description: "Sign in to Supio Console",
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
