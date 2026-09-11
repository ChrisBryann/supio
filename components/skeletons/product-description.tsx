import Skeleton from "./skeleton";

export function ProductDescriptionSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      {/* Breadcrumb */}
      <Skeleton className="h-4 w-64" />

      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        {/* Image */}
        <Skeleton className="aspect-square w-full max-w-lg" />

        {/* Details */}
        <div className="flex flex-col gap-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <div className="mt-2 flex flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <Skeleton className="mt-4 h-11 w-40 rounded-full" />
        </div>
      </div>
    </div>
  );
}
