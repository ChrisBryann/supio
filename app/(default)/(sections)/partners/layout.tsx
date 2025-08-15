import { PartnerSkeleton } from "@/components/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "SCI Aesthetics partners with trusted industry leaders to deliver premium products and innovative solutions that meet the highest standards of quality and care.",
};

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<PartnerSkeleton />}>{children}</Suspense>;
}
