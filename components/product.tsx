import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  products: Product[];
};

export default function ProductPage({ products }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Explore our Products</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => {
          return (
            <Link href={`/products/${product.id}`} className="hover:underline">
              <div className="flex flex-col gap-2">
                <div className="w-full relative">
                  <Image
                    src={product.product_image.url}
                    alt={product.product_image.alt}
                    width={0}
                    height={0}
           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ width: "100%", height: "400px" }}         
                    // fill
                    // loader={gumletLoader}
                    className="rounded-md object-cover"
                  />
                </div>

                <p className="font-semibold">{product.name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
