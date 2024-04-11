import EditProductComponent from "@/components/edit-product";
import { Product } from "@/types";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type Params = {
  params: {
    product_id: string;
  };
};

const EditProduct = async ({ params }: Params) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products?id=${params.product_id}`,
    {
      cache: "no-cache",
    }
  );
  if (!response.ok) {
    redirect("/");
  }

  const data = await response.json();
  if (!data || (data && !data.product)) redirect("/");

  const product = data.product as Product;

  return <EditProductComponent product={product} />;
};

export default EditProduct;
