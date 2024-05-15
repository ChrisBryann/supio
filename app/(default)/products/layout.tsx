import LoadingSpinner from "@/components/utils/spinner";
import { Suspense } from "react";

const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section data-aos="zoom-y-out">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-28 pb-12 md:pb-20 flex flex-col items-center">
          <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
        </div>
      </div>
    </section>
  );
};

export default ProductsLayout;
