import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalDocument from "./legal-document";
import { getCompanyInfo, getLegalPage } from "@/lib/legal-pages";

export async function legalPageMetadata(slug: string, fallbackTitle: string): Promise<Metadata> {
  const [page, company] = await Promise.all([getLegalPage(slug), getCompanyInfo()]);
  const title = page?.title ?? fallbackTitle;
  return {
    title,
    description:
      page?.metaDescription ||
      `${title} ${company.legalName}${company.brandName ? ` (${company.brandName})` : ""}.`,
  };
}

// A legal page rendered from the CMS; 404 until it's published there.
export default async function LegalPageView({ slug }: { slug: string }) {
  const [page, company] = await Promise.all([getLegalPage(slug), getCompanyInfo()]);
  if (!page) notFound();
  return <LegalDocument page={page} company={company} />;
}
