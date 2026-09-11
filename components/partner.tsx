"use client";
import { Partner } from "@/types";
import { ComboBox } from "./ui/combobox";
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

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

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

  const regions = [...new Set(partners.flatMap((p) => p.location))].map(
    (region) => ({ label: region, value: region })
  );

  const visible = location
    ? partners.filter((partner) => partner.location.includes(location))
    : partners;

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="max-w-2xl" data-aos="fade-up">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-gray-500">
          Our Partners
        </p>
        <h1 className="text-3xl font-light leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
          Find Our Products in Our Trusted Partners.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-500">
          SCI Aesthetics partners with trusted industry leaders to deliver
          premium products and innovative solutions that meet the highest
          standards of quality and care.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="w-full md:w-72 md:flex-none">
          <ComboBox
            open={open}
            setOpen={setOpen}
            value={location}
            setValue={setLocation}
            options={regions}
            type="Region"
          />
        </div>
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
            {isPending ? (
              <LoaderCircle className="size-5 animate-spin" />
            ) : (
              <Search className="size-5" />
            )}
          </span>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => handlePartnerSearchURL(e.target.value)}
            defaultValue={searchParams.get("query")?.toString()}
            className="h-12 w-full rounded-full border border-gray-300 bg-white pl-12 pr-5 text-base text-gray-800 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      {/* Grid */}
      {visible.length === 0 ? (
        <p className="py-16 text-center text-gray-500">No partners found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
          {visible.map((partner) => (
            <div key={partner.id} className="flex flex-col">
              <div className="relative aspect-square w-full overflow-hidden bg-white">
                {partner.partner_image?.url ? (
                  <Image
                    src={partner.partner_image.url}
                    alt={partner.partner_image.alt || partner.name}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-4"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sky-50 to-purple-50">
                    <span className="text-4xl font-light tracking-wide text-gray-400">
                      {getInitials(partner.name)}
                    </span>
                  </div>
                )}
              </div>
              {partner.location?.length > 0 && (
                <p className="mt-3 text-sm text-gray-500">
                  {partner.location.join(", ")}
                </p>
              )}
              <p className="text-lg font-medium text-gray-900">
                {partner.name}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pageCount > 1 && (
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
              <span className="px-2 text-sm text-gray-500">
                Page {currentPage} of {pageCount}
              </span>
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
      )}
    </div>
  );
}
