import { ProductDescriptionSkeleton } from "@/components/skeletons";
import { Product } from "@/types";
import { BASE_URL } from "@/utils/url";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type Props = {
  params: Promise<{
    product_id: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product_id } = await params;
  try {
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${product_id}?select[name]=true&select[main_description]=true`,
      {
        headers: {
          "x-frontend-secret": process.env.PAYLOAD_FRONTEND_SHARED_SECRET || "",
        },
      }
    );
    if (!response.ok) {
      redirect("/");
    }

    const product: Product = await response.json();
    return {
      title: `SCI Aesthetics | ${product.name}`,
      description: product.main_description,
    };
  } catch (err) {}
  return {
    title: "SCI Aesthetics | Product",
  };
}

export default function ProductDescriptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<ProductDescriptionSkeleton />}>{children}</Suspense>
  );
}
