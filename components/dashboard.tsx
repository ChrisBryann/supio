import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  products: Product[];
};

const DashboardComponent = ({ products }: Props) => {
  return (
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
  );
};

export default DashboardComponent;
