import ProductPage from "@/components/product";
import { Product } from "@/types";

export const revalidate = 24 * 60 * 60 // every day

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
    return null;
  }
  const data = await response.json();
  const products: Product[] = data.docs;
  return <ProductPage products={products} />;
};

export default ProductsPage;
