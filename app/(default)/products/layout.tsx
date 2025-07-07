import LoadingSpinner from "@/components/utils/spinner";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "SCI Aesthetics | Revivsome Exosome Therapy for Skin Regeneration",
  description:
    "Revivsome is an advanced exosome skin treatment that targets dullness, acne scars, fine lines & skin texture. Experience cellular-level regeneration with SCI Aesthetics.",
};

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
