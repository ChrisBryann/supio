import { Separator } from "../ui/separator";
import Skeleton from "./skeleton";

export function PartnerSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className="max-w-3xl mx-auto flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-semibold">Our Partners</h1>
        <h2 className="text-lg">
          SCI Aesthetics partners with trusted industry leaders to deliver
          premium products and innovative solutions that meet the highest
          standards of quality and care.
        </h2>
      </div>
      <Separator />
      <div className="flex flex-col md:flex-row gap-4">
        <Skeleton className="w-full sm:min-w-[250px] sm:max-w-[250px] h-8" />
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-row gap-2 items-center">
            <Skeleton className="w-full h-8" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Skeleton className="w-full h-[250px]" />
            <Skeleton className="w-full h-[250px]" />
            <Skeleton className="w-full h-[250px]" />
            <Skeleton className="w-full h-[250px]" />
            <Skeleton className="w-full h-[250px]" />
            <Skeleton className="w-full h-[250px]" />
            <Skeleton className="w-full h-[250px]" />
            <Skeleton className="w-full h-[250px]" />
            <Skeleton className="w-full h-[250px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
