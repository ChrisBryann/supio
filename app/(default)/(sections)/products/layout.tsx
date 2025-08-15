import { ProductSkeleton } from "@/components/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore SCI Aesthetics’ selection of advanced regenerative skincare solutions in Indonesia, featuring premium treatments for youthful, healthy skin.",
};

const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<ProductSkeleton />}>{children}</Suspense>;
};

export default ProductsLayout;
