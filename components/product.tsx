import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  products: Product[];
};

export default function ProductPage({ products }: Props) {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div data-aos="fade-up">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-gray-500">
          Our Products
        </p>
        <h1 className="text-3xl font-light tracking-tight text-gray-900 sm:text-4xl">
          Elevating Clinical Aesthetics to the Next Level
        </h1>
      </div>

      {/* Grid: full-bleed to the viewport edges regardless of the section
          container's max-width/padding (the app-layout root clips any
          overflow, so 100vw won't cause horizontal scroll). Tiny gaps between
          items; product name overlaid on a bottom fade. */}
      <div className="grid w-screen grid-cols-2 gap-2 mx-[calc(50%-50vw)] lg:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group relative aspect-[3/4] overflow-hidden"
          >
            <Image
              src={product.product_image.url}
              alt={product.product_image.alt || product.name}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Bottom fade for name legibility */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
              aria-hidden="true"
            />
            <p className="absolute bottom-5 left-5 right-5 text-lg font-medium leading-snug text-white">
              {product.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
