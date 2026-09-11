"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";

type Props = {
  products: Product[];
};

const THUMB_WIDTH_PCT = 28;

export default function Products({ products }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [progress, setProgress] = useState(0);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    setProgress(Math.max(0, Math.min(1, emblaApi.scrollProgress())));
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onScroll();
    emblaApi.on("scroll", onScroll).on("reInit", onScroll);
    return () => {
      emblaApi.off("scroll", onScroll).off("reInit", onScroll);
    };
  }, [emblaApi, onScroll]);

  return (
    <section id="products" className="relative bg-white py-16 md:py-24">
      <div className="mx-auto max-w-site px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-8 md:mb-12" data-aos="fade-up">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-gray-500">
            Our Products
          </p>
          <h2 className="text-3xl font-light tracking-tight text-gray-900 sm:text-4xl">
            Elevating Clinical Aesthetics to the Next Level
          </h2>
        </div>
      </div>

      {/* Carousel: full-bleed, cards flush (no gap / no rounding), leftmost
          image sits at the very edge of the viewport, per the prototype. */}
      <div className="w-full">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group relative aspect-[3/4] shrink-0 grow-0 basis-3/4 overflow-hidden sm:basis-1/2 lg:basis-1/4"
              >
                <Image
                  src={product.product_image.url}
                  alt={product.product_image.alt || product.name}
                  fill
                  sizes="(max-width: 640px) 75vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Legibility scrim */}
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
      </div>

      <div className="mx-auto max-w-site px-6 lg:px-8">
        {/* Progress bar */}
        <div className="mx-auto mt-8 h-1 w-56 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-gray-900"
            style={{
              width: `${THUMB_WIDTH_PCT}%`,
              transform: `translateX(${
                (progress * (100 - THUMB_WIDTH_PCT)) / THUMB_WIDTH_PCT * 100
              }%)`,
            }}
          />
        </div>

        {/* See all */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white"
          >
            See All Product
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
