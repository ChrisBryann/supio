import ProductDescription from "@/components/product-description";
import { Product } from "@/types";
import { BASE_URL } from "@/utils/url";
import { redirect } from "next/navigation";

type Params = {
  params: Promise<{
    product_id: string;
  }>;
};

export const revalidate = 24 * 60 * 60; // every day

export async function generateStaticParams() {
  const response = await fetch(
    `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?select[id]=true`,
    {
      headers: {
        "x-frontend-secret": process.env.PAYLOAD_FRONTEND_SHARED_SECRET || "",
      },
    }
  );

  if (!response.ok) {
    // redirect 404 no connection?
    return [];
  }
  const data = await response.json();
  const products: Product[] = data.docs;
  return products;
}

const ProductDescriptionPage = async ({ params }: Params) => {
  const { product_id } = await params;
  const response = await fetch(
    `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${product_id}`,
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
  return <ProductDescription product={product} />;
};

export default ProductDescriptionPage;
