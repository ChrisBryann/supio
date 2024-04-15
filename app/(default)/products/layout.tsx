import LoadingSpinner from "@/components/utils/spinner";
import { Suspense } from "react";

const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20 flex flex-col items-center">
          <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
        </div>
      </section>
  );
};

export default ProductsLayout;
