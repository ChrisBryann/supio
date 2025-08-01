import { BlogDescriptionSkeleton } from "@/components/skeletons";
import React, { Suspense } from "react";

export default function BlogDescriptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<BlogDescriptionSkeleton />}>{children}</Suspense>;
}
