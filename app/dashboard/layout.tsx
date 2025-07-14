import Link from "next/link";
import { Suspense } from "react";
import DashboardSkeleton from "@/components/skeletons/dashboard";
import { Button } from "@/components/ui/button";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 px-6">
        <div className="pt-24 pb-12 md:pt-28 md:pb-20">
          {/* Page header */}
          <div className="pb-12 md:pb-20">
            <div className="flex items-center">
              <header className="grow">
                <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                  Product Collection
                </h2>

                <p className="mt-4 max-w-md text-gray-500">
                  View your products here.
                </p>
              </header>
              <Button asChild className="text-md">
                <Link href={"/products/add"}>Add Product</Link>
              </Button>
            </div>
            <Suspense fallback={<DashboardSkeleton />}>{children}</Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};
export default DashboardLayout;
