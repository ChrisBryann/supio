import Hero from "@/components/hero";
import Products from "@/components/products";
import { Product } from "@/types";
import { BASE_URL } from "@/utils/url";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const getServerSideProps = (async () => {
  const response = await fetch(`${BASE_URL}/api/products?doc_limit=3`, {
    cache: "no-cache",
  });
  console.log(response);

  if (!response.ok) {
    // redirect 404 no connection?
    console.log(response);
    return { props: { products: [], status: response.ok } };
  }
  const data = await response.json();
  const products = ((data && data.products) ?? []) as Product[];
  return { props: { products, status: response.ok } };
}) satisfies GetServerSideProps<{ products: Product[]; status: boolean }>;

export default async function Home() {
  const {
    props: { products, status },
  } = await getServerSideProps();
  if (!status) {
    return <></>;
  }
  return (
    <>
      <Hero />
      <Products products={products} />
    </>
  );
}
