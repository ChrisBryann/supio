import Link from "next/link";
import { Suspense } from "react";
import DashboardSkeleton from "@/components/skeletons/dashboard";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4 px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
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
              <Link
                href={"/products/add"}
                className="underline font-semibold hover:text-gray-600 transition duration-150 ease-in-out"
              >
                Add Product
              </Link>
            </div>
            <Suspense fallback={<DashboardSkeleton />}>{children}</Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};
export default DashboardLayout;
