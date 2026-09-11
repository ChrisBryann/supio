import Hero from "@/components/hero";
import Products from "@/components/products";
import Partners from "@/components/partners";
import { Partner, Product } from "@/types";
import { notFound } from "next/navigation";

export const revalidate = 86400;

const cmsHeaders = {
  "x-frontend-secret": process.env.PAYLOAD_FRONTEND_SHARED_SECRET || "",
};

async function getProducts(): Promise<Product[]> {
  const response = await fetch(
    `https://${process.env.BACKEND_URL}/api/products`,
    { headers: cmsHeaders }
  );
  if (!response.ok) notFound();
  const data = await response.json();
  return data.docs;
}

// Partners power a supplementary section - a failure here should not take down
// the whole landing page, so we swallow errors and render an empty list.
async function getPartners(): Promise<Partner[]> {
  try {
    const response = await fetch(
      `https://${process.env.BACKEND_URL}/api/partners?limit=100&where[show_at_landing][equals]=true`,
      { headers: cmsHeaders }
    );
    if (!response.ok) {
      console.error("[home] partners fetch failed:", response.status);
      return [];
    }
    const data = await response.json();
    return data.docs ?? [];
  } catch (error) {
    console.error("[home] partners fetch error:", error);
    return [];
  }
}

export default async function Home() {
  const [products, partners] = await Promise.all([
    getProducts(),
    getPartners(),
  ]);

  return (
    <>
      <Hero />
      <Products products={products} />
      <Partners partners={partners} />
    </>
  );
}
