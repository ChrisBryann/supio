import UpsertProductSkeleton from "@/components/skeletons/upsert-product";
import { Suspense } from "react";

const EditProductLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section
      data-aos="zoom-y-out"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-16 pb-12 md:pb-20">
          <header className="py-4 w-full text-center sm:text-left">
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Edit Product
            </h2>
          </header>
        </div>
        <Suspense fallback={<UpsertProductSkeleton />}>{children}</Suspense>
      </div>
    </section>
  );
};

export default EditProductLayout;
