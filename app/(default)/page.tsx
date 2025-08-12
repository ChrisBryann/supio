import Hero from "@/components/hero";
import Products from "@/components/products";
import { Product } from "@/types";
import { BASE_URL } from "@/utils/url";

export const revalidate = 24 * 60 * 60; // revalidate every day

export async function generateStaticParams() {
  const response = await fetch(
    `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`,
    {
      headers: {
        "x-frontend-secret": process.env.PAYLOAD_FRONTEND_SHARED_SECRET || "",
      },
    }
  );
  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  const products: Product[] = data.docs;
  return products;
}

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
    console.log(response.ok);
    return null;
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
