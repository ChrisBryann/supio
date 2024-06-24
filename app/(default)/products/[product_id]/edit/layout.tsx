import UpsertProductSkeleton from "@/components/skeletons/upsert-product";
import { Suspense } from "react";

const EditProductLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
        <header className="py-4 text-center md:text-left w-full">
          <h2 className="text-xl font-bold text-gray-900 md:text-3xl">
            Edit Product
          </h2>
        </header>
        <Suspense fallback={<UpsertProductSkeleton />}>{children}</Suspense>
    </>
  );
};

export default EditProductLayout;