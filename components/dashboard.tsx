import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  products: Product[];
};

const DashboardComponent = ({ products }: Props) => {
  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4 px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="pb-12 md:pb-20">
            <div className="flex items-center">
              <header className="grow">
                <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                  Product Collection
                </h2>

                <p className="mt-4 max-w-md text-gray-500">
                  View your products here.
                </p>
              </header>
              <button className="underline font-semibold hover:text-gray-600 transition duration-150 ease-in-out">
                Add Product
              </button>
            </div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => {
                return (
                  <li key={product.id}>
                    <Link
                      href={`/products/${product.id}/edit`}
                      className="group block overflow-hidden"
                    >
                      <Image
                        className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                        src={product.image_url}
                        width={450}
                        height="480"
                        alt={product.name}
                      />

                      <div className="relative bg-white pt-3">
                        <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                          {product.name}
                        </h3>

                        {/* <p className="mt-2">
                          <span className="tracking-wider text-gray-900">
                            Edit
                          </span>
                        </p> */}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardComponent;
