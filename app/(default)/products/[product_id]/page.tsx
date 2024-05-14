import ProductDescription from "@/components/product-description";
import { Product } from "@/types";
import { BASE_URL } from "@/utils/url";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { redirect } from "next/navigation";

type Params = {
  params: {
    product_id: string;
  };
};

const getServerSideProps = async ({ params }: Params) => {
  const response = await fetch(
    `${BASE_URL}/api/products?id=${params!.product_id}`,
    {
      cache: "no-cache",
    }
  );
  if (!response.ok) {
    return { props: { product: null, status: response.ok } };
  }

  const data = await response.json();
  if (!data || (data && !data.product))
    return { props: { product: null, status: false } };

  const product = data.product as Product;
  return { props: { product, status: response.ok } };
};

const ProductDescriptionPage = async (params: Params) => {
  const {
    props: { product, status },
  } = await getServerSideProps(params);
  if (!status) {
    redirect("/");
  }

  return <ProductDescription product={product!} />;
};

export default ProductDescriptionPage;
