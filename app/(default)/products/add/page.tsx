import UpsertProductComponent from "@/components/upsert-product";

const AddProduct = async () => {
  return (
    <UpsertProductComponent
      product={{
        id: "",
        name: "",
        main_description: "",
        additional_description: "",
        image_url: "",
      }}
      mode="add"
    />
  );
};

export default AddProduct;
