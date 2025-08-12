import Skeleton from "./skeleton";

export function ProductSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Explore Our Products</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full h-[400px]" />
          <Skeleton className="w-1/2 h-4" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full h-[400px]" />
          <Skeleton className="w-1/2 h-4" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full h-[400px]" />
          <Skeleton className="w-1/2 h-4" />
        </div>
      </div>
    </div>
  );
}