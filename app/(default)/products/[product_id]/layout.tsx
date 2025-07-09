import { Product } from "@/types";
import { BASE_URL } from "@/utils/url";
import { Metadata } from "next";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{
    product_id: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product_id } = await params;
  const response = await fetch(`${BASE_URL}/api/products?id=${product_id}`, {
    cache: "no-cache",
  });

  if (!response.ok) {
    redirect("/");
  }

  const data = await response.json();
  if (!data || (data && !data.product)) redirect("/");
  const product = data.product as Product;
  return {
    title: `SCI Aesthetics | ${product.name}`,
    // description: product.main_description,
  };
}

export default function ProductDescriptionLayout() {}
