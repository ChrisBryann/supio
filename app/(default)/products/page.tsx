import ProductsCarousel from "@/components/products-carousel";
import { Product } from "@/types";
import { BASE_URL } from "@/utils/url";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const getServerSideProps = (async () => {
  const response = await fetch(`${BASE_URL}/api/products`, {
    cache: "no-cache",
  });

  if (!response.ok) {
    // redirect 404 no connection?
    console.log(response);
    return { props: { products: [], status: response.ok } };
  }
  const data = await response.json();
  const products = ((data && data.products) ?? []) as Product[];
  return { props: { products, status: response.ok } };
}) satisfies GetServerSideProps<{ products: Product[]; status: boolean }>;

const ProductsPage = async () => {
  const {
    props: { products, status },
  } = await getServerSideProps();
  if (!status) {
    return <></>;
  }
  return (
    <ProductsCarousel
      products={products}
      options={{ loop: true, align: "center" }}
    />
  );
};

export default ProductsPage;
