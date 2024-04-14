"use client";
import { Product } from "@/types";
import Image from "next/image";
import { useState } from "react";
import * as _ from "lodash";
import { useRouter } from "next/navigation";

type Props = {
  product: Product;
  mode: "add" | "edit";
};

const UpsertProductComponent = ({ product: _product, mode }: Props) => {
  const [product, setProduct] = useState<Product>(_product);
  const [saved, setSaved] = useState<boolean | null>(null);
  const [saving, setSaving] = useState<boolean>(false);

  const router = useRouter();

  const onSave = async (product: Product) => {
    setSaving(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products`,
      {
        method: mode === "edit" ? "PATCH" : "POST",
        body: JSON.stringify({
          product,
        }),
      }
    );
    setSaving(false);
    setSaved(response.ok);
    mode === "edit" ? router.refresh() : router.replace("/dashboard");
    setTimeout(() => setSaved(null), 5000);
  };
  return (
    <section
      className="bg-gradient-to-b from-gray-100 to-white"
      data-aos="zoom-y-out"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <header className="py-4 w-full text-center sm:text-left">
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              {mode === "edit" ? "Edit" : "Add"} Product
            </h2>
          </header>

          <div className="mx-auto text-center pb-12 md:pb-20 flex flex-col md:flex-row space-y-8 md:space-x-8">
            <div className="hover:opacity-50">
              <Image
                className="md:max-w-none mx-auto rounded"
                src={product.image_url}
                width={450}
                height="500"
                alt={product.name}
              />
            </div>
            <div className="px-4 w-full text-left flex flex-col space-y-6">
              <label
                htmlFor="name"
                className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
              >
                <input
                  type="text"
                  id="name"
                  defaultValue={product.name}
                  onChange={(e) => {
                    e.target.value &&
                      setProduct((p) => {
                        return {
                          ...p,
                          name: e.target.value,
                        };
                      });
                  }}
                  className="peer h-10 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-3xl"
                />

                <span className="absolute start-0 top-2 -translate-y-1/2 font-semibold text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                  Name
                </span>
              </label>
              <div>
                <label
                  htmlFor="main_description"
                  className="text-md font-medium text-gray-700"
                >
                  Main Description:
                </label>
                <textarea
                  id="main_description"
                  className="mt-2 w-full rounded-lg border-gray-200 shadow-sm"
                  onChange={(e) => {
                    e.target.value &&
                      setProduct((p) => {
                        return {
                          ...p,
                          main_description: e.target.value.replaceAll(
                            "\n",
                            "\\n"
                          ),
                        };
                      });
                  }}
                  rows={6}
                  defaultValue={product.main_description}
                />
              </div>

              {/* <div
                  style={{ whiteSpace: "pre-line" }}
                  className="text-md font-medium text-gray-700"
                >
                  {product.additional_description?.replace("\\n", "\n")}
                </div> */}
              <div>
                <label
                  htmlFor="additional_description"
                  className="text-md font-medium text-gray-700"
                >
                  Additional Description:
                </label>
                <textarea
                  id="additional_description"
                  className="mt-2 w-full rounded-lg border-gray-200 shadow-sm"
                  onChange={(e) => {
                    e.target.value &&
                      setProduct((p) => {
                        return {
                          ...p,
                          additional_description: e.target.value.replaceAll(
                            "\n",
                            "\\n"
                          ),
                        };
                      });
                  }}
                  rows={6}
                  defaultValue={product.additional_description?.replaceAll(
                    "\\n",
                    "\n"
                  )}
                />
              </div>
              <div className="flex mx-auto gap-x-2 items-center">
                <button
                  className="py-2 px-4 text-md text-white rounded-md bg-blue-700 hover:bg-blue-600 disabled:bg-gray-300"
                  onClick={async () => {
                    await onSave(product);
                  }}
                  disabled={_.isEqual(product, _product) || !!saved}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
                {saved && <p className="font-semibold px-1">Saved!</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpsertProductComponent;
