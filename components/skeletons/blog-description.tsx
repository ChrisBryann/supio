import Skeleton from "./skeleton";

export function BlogDescriptionSkeleton() {
  return (
    <div className="max-w-3xl mx-auto w-full flex flex-col gap-4">
        {/* COVER IMAGE */}
      <Skeleton className="w-full h-[300px]" />
      {/* TITLE */}
      <Skeleton className="w-full h-[50px]" />
      <div className="flex flex-row justify-between">
        {/* AUTHOR & DATE */}
        <Skeleton className="w-[150px] h-[25px]" />
        <Skeleton className="w-[100px] h-[25px]" />
      </div>
      <hr />
      {/* RICH TEXT CONTENT */}
      <Skeleton className="w-full h-[500px]" />
    </div>
  );
}
