"use client";

import { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import FeaturesBg from "@/public/images/features-bg.png";
import RevivsomeWB from "@/public/images/revivsome_wb.jpg";
import RevivsomeSM from "@/public/images/revivsome_sm.jpg";
import WaterDropsCream from "@/public/images/water_drops_cream.png";
import FeaturesElement from "@/public/images/features-element.png";
import Link from "next/link";
import { Product } from "@/types";

type Props = {
  products: Product[];
};

export default function Products({ products }: Props) {
  const [tab, setTab] = useState<number>(0);

  const tabs = useRef<HTMLDivElement>(null);

  const heightFix = () => {
    if (tabs.current && tabs.current.parentElement)
      tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`;
  };

  useEffect(() => {
    heightFix();
  }, []);

  return (
    <section className="relative">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div
        className="absolute inset-0 bg-gray-100 pointer-events-none mb-16"
        aria-hidden="true"
      ></div>
      {/* <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div> */}

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4">Explore our products</h1>
            {/* <p className="text-xl text-gray-600">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat.</p> */}
          </div>

          {/* Section content */}
          <div className="md:grid md:grid-cols-12 md:gap-6">
            {/* Content */}
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6"
              data-aos="fade-right"
            >
              {/* <div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8">
                <h3 className="h3 mb-3">Powerful suite of tools</h3>
                <p className="text-xl text-gray-600">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa.</p>
              </div> */}
              {/* Tabs buttons */}
              <div className="mb-8 md:mb-0">
                {products.map((product, index) => {
                  return (
                    <div
                      key={product.id}
                      className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                        tab !== index
                          ? "bg-white shadow-md border-gray-200 hover:shadow-lg"
                          : "bg-gray-200 border-transparent"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setTab(index);
                      }}
                    >
                      <div>
                        <div className="font-bold leading-snug tracking-tight mb-1 text-2xl">
                          {product.name}
                        </div>
                        <div className="text-gray-600">
                          {product.main_description}
                        </div>
                      </div>
                      <Link
                        href={`/products/${product.id}`}
                        className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3"
                      >
                        <svg
                          className="w-8 h-8"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m10 16 4-4-4-4"
                          />
                        </svg>
                      </Link>
                    </div>
                  );
                })}

                {/* <a
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                    tab !== 2
                      ? "bg-white shadow-md border-gray-200 hover:shadow-lg"
                      : "bg-gray-200 border-transparent"
                  }`}
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(2);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1 text-2xl">
                      Thetis Bio Revivsome Bio WB
                    </div>
                    <div className="text-gray-600">
                      An ampoule containing freeze-dried stem cell culture
                      solution that brightens the skin, increases skin
                      elasticity, and improves wrinkles.
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    <svg
                      className="w-8 h-8"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m10 16 4-4-4-4"
                      />
                    </svg>
                  </div>
                </a>
                <a
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                    tab !== 3
                      ? "bg-white shadow-md border-gray-200 hover:shadow-lg"
                      : "bg-gray-200 border-transparent"
                  }`}
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(3);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1 text-2xl">
                      Water Drops Cream
                    </div>
                    <div className="text-gray-600">
                      This product can show your {"skin's"} oil and moisture
                      balance. You can know your skin condition from how many
                      water drops occur on your skin.{" "}
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    <svg
                      className="w-8 h-8"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m10 16 4-4-4-4"
                      />
                    </svg>
                  </div>
                </a> */}
                <Link
                  className={`flex items-center text-lg text-center text-blue-400 transition duration-300 ease-in-out mb-3 hover:text-blue-500`}
                  href="/products"
                >
                  See all our products
                </Link>
              </div>
            </div>

            {/* Tabs items */}
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1">
              <div className="transition-all">
                <div
                  className="relative flex flex-col text-center lg:text-right pt-5"
                  data-aos="zoom-y-out"
                  ref={tabs}
                >
                  {/* Item 1 */}
                  {products.map((product, index) => {
                    return (
                      <Transition
                        key={product.id}
                        show={tab === index}
                        appear={true}
                        className="w-full"
                        enter="transition ease-in-out duration-700 transform order-first"
                        enterFrom="opacity-0 translate-y-16"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in-out duration-300 transform absolute"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 -translate-y-16"
                        beforeEnter={() => heightFix()}
                        unmount={false}
                      >
                        <div className="relative inline-flex flex-col">
                          <Image
                            className="md:max-w-none mx-auto my-auto rounded"
                            src={product.image_url}
                            width={450}
                            height="480"
                            alt={product.name}
                          />
                        </div>
                      </Transition>
                    );
                  })}

                  {/* Item 2 */}
                  {/* <Transition
                    show={tab === 2}
                    appear={true}
                    className="w-full"
                    enter="transition ease-in-out duration-700 transform order-first"
                    enterFrom="opacity-0 translate-y-16"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in-out duration-300 transform absolute"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-16"
                    beforeEnter={() => heightFix()}
                    unmount={false}
                  >
                    <div className="relative inline-flex flex-col">
                      <Image
                        className="md:max-w-none mx-auto rounded"
                        src={RevivsomeWB}
                        width={450}
                        height="462"
                        alt="revivsome_wb"
                      />
                    </div>
                  </Transition> */}
                  {/* Item 3 */}
                  {/* <Transition
                    show={tab === 3}
                    appear={true}
                    className="w-full"
                    enter="transition ease-in-out duration-700 transform order-first"
                    enterFrom="opacity-0 translate-y-16"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in-out duration-300 transform absolute"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-16"
                    beforeEnter={() => heightFix()}
                    unmount={false}
                  >
                    <div className="relative inline-flex flex-col">
                      <Image
                        className="md:max-w-none mx-auto rounded"
                        src={WaterDropsCream}
                        width={450}
                        height="462"
                        alt="Features bg"
                      />
                    </div>
                  </Transition> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
