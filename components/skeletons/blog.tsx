import Skeleton from "./skeleton";

export function BlogSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Explore Our Blog</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="w-full h-[350px]" />
        <Skeleton className="w-full h-[350px]" />
        <Skeleton className="w-full h-[350px]" />
      </div>
    </div>
  );
}
