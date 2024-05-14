import ProductsCarousel from "@/components/products-carousel";
import { Product } from "@/types";
import { BASE_URL } from "@/utils/url";

export const dynamic = 'force-dynamic';

const ProductsPage = async () => {
  const response = await fetch(`${BASE_URL}/api/products`, {
    cache: "no-cache",
  });

  if (!response.ok) {
    // redirect 404 no connection?
    return <></>;
  }
  const data = await response.json();
  // if (!data || (data && !data.products)) return <></>;
  const products = ((data && data.products) ?? []) as Product[];
  return <ProductsCarousel products={products} options={{ loop: true, align: "center" }} />;
};

export default ProductsPage;
