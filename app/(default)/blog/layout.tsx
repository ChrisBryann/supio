import BlogSkeleton from "@/components/skeletons/blog";
import { Suspense } from "react";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="py-8">
          {/* Page header */}
          <div className="pb-12 md:pb-20">
            <Suspense fallback={<BlogSkeleton />}>{children}</Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
