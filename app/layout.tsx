import AppLayout from "@/components/ui/app-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Supio",
  description: "Supio Indonesia",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
