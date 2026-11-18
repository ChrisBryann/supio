import Skeleton from "./skeleton";

// Mirrors components/blog-description.tsx.
export function BlogDescriptionSkeleton() {
  return (
    <div className="flex w-full flex-col gap-10">
      {/* BREADCRUMB */}
      <Skeleton className="h-4 w-48" />
      {/* TITLE BLOCK */}
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="mt-2 h-4 w-40" />
      </div>
      {/* COVER */}
      <Skeleton className="mx-auto aspect-[16/9] w-full max-w-5xl rounded-none" />
      {/* CONTENT */}
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
