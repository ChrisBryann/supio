import Hero from "@/components/hero";
import Products from "@/components/products";
import { Product } from "@/types";
import { BASE_URL } from "@/utils/url";

export default async function Home() {

  const response = await fetch(
    `${BASE_URL}/api/products?doc_limit=3`,
    {
      cache: "no-cache",
    }
  );
  

  if (!response.ok) {
    // redirect 404 no connection?
    console.log(response);
    return <></>;
  }
  const data = await response.json();
  // if (!data || (data && !data.products)) return <></>;
  const products = ((data && data.products) ?? []) as Product[];

  return (
    <>
      <Hero />
      <Products products={products} />
    </>
  );
}
