import Skeleton from "./skeleton";

export function ProductSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-10 w-full max-w-xl" />
      </div>

      {/* Grid */}
      <div className="grid w-screen grid-cols-2 gap-2 mx-[calc(50%-50vw)] lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[3/4] w-full" />
        ))}
      </div>
    </div>
  );
}
