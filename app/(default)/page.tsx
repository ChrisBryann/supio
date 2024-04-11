import Hero from "@/components/hero";
import Products from "@/components/products";
import { Product } from "@/types";

export default async function Home() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products?doc_limit=3`,
    {
      cache: "no-cache",
    }
  );

  if (!response.ok) {
    // redirect 404 no connection?
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
