import { Product } from "@/types";
import Image from "next/image";

type Props = {
  product: Product;
};

const ProductDescription = ({ product }: Props) => {
  return (
    <section
      data-aos="zoom-y-out"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}

          <div className="mx-auto text-center pb-12 md:pb-20 flex flex-col md:flex-row md:space-x-8">
            <div className="">
              <Image
                className="md:max-w-none mx-auto rounded"
                src={product.image_url}
                width={450}
                height="500"
                alt={product.name}
              />
            </div>
            <div className="px-4 mx-auto text-left flex flex-col space-y-6">
              <div className="text-4xl font-semibold">{product.name}</div>
              <div className="text-md font-medium text-gray-700">
                {product.main_description}
              </div>

              <div
                style={{ whiteSpace: "pre-line" }}
                className="text-md font-medium text-gray-700"
              >
                {product.additional_description?.replaceAll("\\n", "\n")}
              </div>
              <button className="p-2 mr-auto text-md text-white rounded-md bg-black flex justify-center items-center gap-2 hover:bg-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDescription;
