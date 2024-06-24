import UpsertProductSkeleton from "@/components/skeletons/upsert-product";
import { Suspense } from "react";

const AddProductLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
        <header className="py-4 w-full text-center sm:text-left">
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Add Product
          </h2>
        </header>
      <Suspense fallback={<UpsertProductSkeleton />}>{children}</Suspense>
    </>
  );
};

export default AddProductLayout;
