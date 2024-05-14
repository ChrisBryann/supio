import ProductDescription from "@/components/product-description";
import { Product } from "@/types";
import { BASE_URL } from "@/utils/url";
import { redirect } from "next/navigation";

type Params = {
  params: {
    product_id: string;
  };
};

export const dynamic = 'force-dynamic';

const ProductDescriptionPage = async ({ params }: Params) => {
  const response = await fetch(
    `${BASE_URL}/api/products?id=${params.product_id}`,
    {
      cache: "no-cache",
    }
  );
  if (!response.ok) {
    redirect("/");
  }

  const data = await response.json();
  if (!data || (data && !data.product)) redirect("/");

  const product = data.product as Product;

  return <ProductDescription product={product} />;
};

export default ProductDescriptionPage;
