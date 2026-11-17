import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

// GET /api/globals/company-info
export interface CompanyInfo {
  legalName: string;
  brandName?: string | null;
  address: string;
  whatsappUrl?: string | null;
  whatsappLabel?: string | null;
}

export type LegalBlock =
  | { id?: string; blockType: "text"; content: SerializedEditorState }
  | { id?: string; blockType: "subheading"; heading: string }
  | {
      id?: string;
      blockType: "table";
      columns: { id?: string; label: string }[];
      rows: { id?: string; cells: { id?: string; text: string }[] }[];
    }
  | { id?: string; blockType: "contactCard" };

export interface LegalSectionDoc {
  id?: string;
  heading: string;
  // Always set by the backend (normalised and unique within the page).
  anchor: string;
  body: LegalBlock[];
}

// GET /api/legal-pages?where[slug][equals]=…&depth=1 (published docs only)
export interface LegalPage {
  id: string;
  title: string;
  slug: string;
  lastUpdated: string;
  metaDescription?: string | null;
  intro?: SerializedEditorState | null;
  sections: LegalSectionDoc[];
  // Objects at depth=1; an unpublished related page comes back as a bare id.
  relatedPages?: (string | Pick<LegalPage, "title" | "slug">)[] | null;
}
