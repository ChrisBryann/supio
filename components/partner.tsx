"use client";
import { Partner } from "@/types";
import { ComboBox } from "./ui/combobox";
import {
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { Search } from "lucide-react";

type Props = {
  partners: Partner[];
};

const PAGE_SIZE = 12;

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

export default function PartnerPage({ partners }: Props) {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  // Dropdown options come from the ENTIRE dataset, so the selected region
  // never disappears from the control.
  const regions = useMemo(
    () =>
      [...new Set(partners.flatMap((p) => p.location))].map((region) => ({
        label: region,
        value: region,
      })),
    [partners]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return partners.filter((partner) => {
      const matchesRegion = !location || partner.location.includes(location);
      const matchesQuery = !q || partner.name.toLowerCase().includes(q);
      return matchesRegion && matchesQuery;
    });
  }, [partners, location, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const paged = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  // Selecting a region/searching changes the result set, so jump back to page 1.
  const handleRegionChange: Dispatch<SetStateAction<string>> = (value) => {
    setLocation(value);
    setPage(1);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };

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
            setValue={handleRegionChange}
            options={regions}
            type="Region"
          />
        </div>
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="size-5" />
          </span>
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            className="h-12 w-full rounded-full border border-gray-300 bg-white pl-12 pr-5 text-base text-gray-800 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      {/* Grid */}
      {paged.length === 0 ? (
        <p className="py-16 text-center text-gray-500">No partners found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
          {paged.map((partner) => (
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

      {/* Pagination (client-side) */}
      {pageCount > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (safePage > 1) setPage(safePage - 1);
                }}
                aria-disabled={safePage <= 1}
                tabIndex={safePage <= 1 ? -1 : undefined}
                className={
                  safePage <= 1
                    ? "pointer-events-none opacity-50"
                    : undefined
                }
              />
            </PaginationItem>
            <PaginationItem>
              <span className="px-2 text-sm text-gray-500">
                Page {safePage} of {pageCount}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (safePage < pageCount) setPage(safePage + 1);
                }}
                aria-disabled={safePage >= pageCount}
                tabIndex={safePage >= pageCount ? -1 : undefined}
                className={
                  safePage >= pageCount
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
