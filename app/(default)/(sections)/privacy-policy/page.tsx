import LegalPageView, { legalPageMetadata } from "@/components/legal/legal-page-view";

// Content lives in the CMS (Legal pages → "privacy-policy").
export const revalidate = 3600;

const SLUG = "privacy-policy";

export function generateMetadata() {
  return legalPageMetadata(SLUG, "Kebijakan Privasi");
}

export default function PrivacyPolicyPage() {
  return <LegalPageView slug={SLUG} />;
}
