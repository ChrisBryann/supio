import Skeleton from "./skeleton";

export function PartnerSkeleton() {
  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex max-w-2xl flex-col gap-4">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-12 w-full max-w-xl" />
        <Skeleton className="h-16 w-full max-w-xl" />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 md:flex-row">
        <Skeleton className="h-12 w-full rounded-full md:w-72" />
        <Skeleton className="h-12 flex-1 rounded-full" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-32" />
          </div>
        ))}
      </div>
    </div>
  );
}
