import Skeleton from "./skeleton";

export function ProductDescriptionSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="pt-24 pb-12 md:pt-28 md:pb-20">
        <div className="pb-12 md:pb-20 flex flex-col md:flex-row md:space-x-8">
            <Skeleton className="min-w-[400px] h-[500px]"/>
            <div className="px-4 mx-auto flex flex-col space-y-6">
                <Skeleton className="w-[500px] h-8" />
                <Skeleton className="w-[500px] h-4" />
                <Skeleton className="w-1/2 h-4" />
                <Skeleton className="w-[500px] h-4" />
                <Skeleton className="w-[400px] h-4" />
                <Skeleton className="w-[45  0px] h-4" />
                <Skeleton className="w-[500px] h-4" />
                <Skeleton className="w-[500px] h-4" />
            </div>
        </div>
      </div>
    </div>
  );
}
