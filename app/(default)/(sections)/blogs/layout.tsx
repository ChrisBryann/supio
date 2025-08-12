import { BlogSkeleton } from "@/components/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "SCI Aesthetics | Blogs",
  description:
    "Read SCI Aesthetics’ latest blogs on skincare, regenerative therapies, and beauty innovations to help you achieve healthy, youthful skin.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<BlogSkeleton />}>{children}</Suspense>;
}
