import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  product: Product;
};

const ProductDescription = ({ product }: Props) => {
  return (
    <div className="flex flex-col gap-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
        <Link
          href="/products"
          className="uppercase tracking-wide transition hover:text-gray-700"
        >
          Products
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="font-medium text-gray-900">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        {/* Image */}
        <div className="relative aspect-square w-full max-w-lg overflow-hidden bg-gray-100">
          <Image
            src={product.product_image.url}
            alt={product.product_image.alt || product.name}
            fill
            sizes="(max-width: 768px) 100vw, 512px"
            className="object-cover"
            priority
          />
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-light tracking-tight text-gray-900 sm:text-4xl">
            {product.name}
          </h1>

          {product.main_description && (
            <p className="mt-4 text-xl text-gray-800">
              {product.main_description}
            </p>
          )}

          {product.additional_description && (
            <p
              style={{ whiteSpace: "pre-line" }}
              className="mt-6 text-base leading-relaxed text-gray-500"
            >
              {product.additional_description.replaceAll("\\n", "\n")}
            </p>
          )}

          {product.brochure?.url && (
            <Link
              href={product.brochure.url}
              target="_blank"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white"
            >
              See Brochure
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
