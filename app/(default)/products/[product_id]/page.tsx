import ProductDescription from "@/components/product-description";
import { headers } from "next/headers";

type Params = {
  params: {
    product_id: string;
  };
};

const ProductDescriptionPage = ({ params }: Params) => {
  const headersList = headers();
  return (
    <ProductDescription
      product_id={params.product_id}
      existingProduct={headersList.get("product")}
    />
  );
};

export default ProductDescriptionPage;
