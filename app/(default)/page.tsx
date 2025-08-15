import Hero from "@/components/hero";
import Products from "@/components/products";
import { Product } from "@/types";
import { notFound } from "next/navigation";

export const revalidate = 86400;

export default async function Home() {
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
  // if (!data || (data && !data.products)) return <></>;
  const products: Product[] = data.docs;

  return (
    <>
      <Hero />
      <Products products={products} />
    </>
  );
}
