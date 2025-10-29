"use client";
import { Partner } from "@/types";
import { Separator } from "./ui/separator";
import { ComboBox } from "./ui/combobox";
import { Input } from "./ui/input";
import { useState, useTransition } from "react";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LoaderCircle, Search } from "lucide-react";

type Props = {
  partners: Partner[];
  pageCount: number;
};

export default function PartnerPage({ partners, pageCount }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState("");

  const [isPending, setIsPending] = useTransition();

  const handlePartnerSearchURL = (query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }
    setIsPending(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  const createPartnerPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  return (
    <div className="flex flex-col gap-8">
      <div className="max-w-3xl mx-auto flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-semibold">Our Partners</h1>
        <h2 className="text-lg">
          SCI Aesthetics partners with trusted industry leaders to deliver
          premium products and innovative solutions that meet the highest
          standards of quality and care.
        </h2>
      </div>
      <Separator />
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-4 xl:col-span-1">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1">
            <ComboBox
              open={open}
              setOpen={setOpen}
              value={location}
              setValue={setLocation}
              options={[
                ...[
                  ...new Set(partners.flatMap((partner) => partner.location)),
                ].map((region) => ({
                  label: region,
                  value: region,
                })),
              ]}
              type="region"
            />
          </div>
        </div>
        <div className="col-span-4 xl:col-span-3 flex flex-col gap-4">
          <div className="flex flex-row gap-2 items-center">
            {isPending ? (
              <LoaderCircle className="size-5 animate-spin" />
            ) : (
              <Search className="size-5" />
            )}
            <Input
              placeholder="Search by name"
              onChange={(e) => {
                handlePartnerSearchURL(e.target.value);
              }}
              defaultValue={searchParams.get("query")?.toString()}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {(location
              ? partners.filter((partner) =>
                  partner.location.includes(location)
                )
              : partners
            ).map((partner) => {
              return (
                <div
                  key={partner.id}
                  className={`w-full h-[250px] flex flex-col gap-2 border shadow-md rounded-lg p-2 justify-center ${!partner.partner_image && "items-center"}`}
                >
                  {partner.partner_image && (
                    <div className="w-full relative">
                      <Image
                        src={partner.partner_image.url}
                        alt={partner.partner_image.alt}
                        width={0}
                        height={0}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ width: "100%", height: "150px" }}
                        // fill
                        // loader={gumletLoader}
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div
                    className={`text-${partner.partner_image ? "xl" : "2xl"} text-center font-bold`}
                  >
                    {partner.name}
                  </div>
                </div>
              );
            })}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={createPartnerPageURL(currentPage - 1)}
                  aria-disabled={currentPage <= 1}
                  tabIndex={currentPage <= 1 ? -1 : undefined}
                  className={
                    currentPage <= 1
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                />
              </PaginationItem>
              <PaginationItem>
                Page {currentPage} out of {pageCount}
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href={createPartnerPageURL(currentPage + 1)}
                  aria-disabled={currentPage >= pageCount}
                  tabIndex={currentPage >= pageCount ? -1 : undefined}
                  className={
                    currentPage >= pageCount
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
