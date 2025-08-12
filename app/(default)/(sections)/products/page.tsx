import ProductPage from "@/components/product";
import { Product } from "@/types";
import { notFound } from "next/navigation";

export const revalidate = 86400;

const ProductsPage = async () => {
  const response = await fetch(
    `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`,
    {
      headers: {
        "x-frontend-secret": process.env.PAYLOAD_FRONTEND_SHARED_SECRET || "",
      },
    }
  );

  if (!response.ok) {
    // redirect 404 no connection?
    notFound();
  }
  const data = await response.json();
  const products: Product[] = data.docs;
  return <ProductPage products={products} />;
};

export default ProductsPage;
