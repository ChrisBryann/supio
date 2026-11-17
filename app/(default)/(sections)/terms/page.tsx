import LegalPageView, { legalPageMetadata } from "@/components/legal/legal-page-view";

// Content lives in the CMS (Legal pages → "terms").
export const revalidate = 3600;

const SLUG = "terms";

export function generateMetadata() {
  return legalPageMetadata(SLUG, "Syarat dan Ketentuan");
}

export default function TermsPage() {
  return <LegalPageView slug={SLUG} />;
}
