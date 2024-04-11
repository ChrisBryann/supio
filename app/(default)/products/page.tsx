import ProductsCarousel from "@/components/products-carousel";

const ProductsPage = () => {

  return (
    <ProductsCarousel
      options={{ loop: true, align: "center" }}
    />
  );
};

export default ProductsPage;
