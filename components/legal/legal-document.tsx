import Link from "next/link";
import RichText from "@/components/rich-text/rich-text";
import type { CompanyInfo, LegalBlock, LegalPage, LegalSectionDoc } from "@/types";
import { formatLegalDate } from "@/lib/legal-pages";
import { legalPagePath } from "@/lib/legal-routes";

type Props = {
  page: LegalPage;
  company: CompanyInfo;
};

function TableOfContents({ sections }: { sections: LegalSectionDoc[] }) {
  return (
    <ol className="space-y-2 text-sm">
      {sections.map((section, index) => (
        <li key={section.anchor}>
          <a
            href={`#${section.anchor}`}
            className="flex gap-2 text-gray-500 transition hover:text-gray-900"
          >
            <span className="w-5 shrink-0 tabular-nums text-gray-400">{index + 1}.</span>
            <span>{section.heading}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}

function LegalContact({ company }: { company: CompanyInfo }) {
  return (
    <div className="not-prose mt-4 rounded-2xl border border-gray-200 p-6 text-sm leading-relaxed text-gray-600">
      <p className="font-medium text-gray-900">{company.legalName}</p>
      {company.brandName && <p className="mt-1">({company.brandName})</p>}
      <address className="mt-3 not-italic">{company.address}</address>
      {company.whatsappUrl && (
        <p className="mt-3">
          WhatsApp:{" "}
          <a
            href={company.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gray-900 underline underline-offset-2"
          >
            {company.whatsappLabel || "Hubungi kami melalui WhatsApp"}
          </a>
        </p>
      )}
    </div>
  );
}

function SectionBody({ blocks, company }: { blocks: LegalBlock[]; company: CompanyInfo }) {
  // Subheadings are lettered a., b., … counting within this section only.
  let subheadings = 0;
  return (
    <>
      {blocks.map((block, index) => {
        const key = block.id ?? index;
        switch (block.blockType) {
          case "subheading":
            return (
              <h3 key={key}>
                {String.fromCharCode(97 + subheadings++)}. {block.heading}
              </h3>
            );
          case "text":
            return block.content ? <RichText key={key} richContent={block.content} bare /> : null;
          case "table":
            return (
              <div key={key} className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      {block.columns.map((column, c) => (
                        <th key={column.id ?? c}>{column.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={row.id ?? r}>
                        {row.cells.map((cell, c) => (
                          <td key={cell.id ?? c} className="whitespace-pre-line">
                            {cell.text}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "contactCard":
            return <LegalContact key={key} company={company} />;
          default:
            // A block type added in the CMS before the website supports it.
            return null;
        }
      })}
    </>
  );
}

// Legal pages (Kebijakan Privasi, Syarat dan Ketentuan) from the CMS: header,
// table of contents (sticky on desktop, collapsible on mobile), intro,
// numbered sections and "Baca juga".
export default function LegalDocument({ page, company }: Props) {
  const sections = page.sections ?? [];
  const related = (page.relatedPages ?? []).filter(
    (p): p is Pick<LegalPage, "title" | "slug"> => typeof p === "object" && p !== null
  );

  return (
    <article lang="id" className="flex flex-col gap-10">
      <header className="max-w-3xl" data-aos="fade-up">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-gray-500">
          Legal
        </p>
        <h1 className="text-3xl font-light leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
          {page.title}
        </h1>
        <p className="mt-5 text-sm text-gray-500">
          Terakhir diperbarui: {formatLegalDate(page.lastUpdated)} · {company.legalName}
        </p>
      </header>

      <div className="grid gap-10 border-t border-gray-200 pt-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
        <aside>
          <details className="group rounded-2xl border border-gray-200 px-5 py-4 lg:hidden">
            <summary className="cursor-pointer list-none text-sm font-medium text-gray-900 [&::-webkit-details-marker]:hidden">
              Daftar Isi
              <span className="float-right text-gray-400 transition group-open:rotate-45">+</span>
            </summary>
            <div className="mt-4">
              <TableOfContents sections={sections} />
            </div>
          </details>
          <nav aria-label="Daftar isi" className="sticky top-28 hidden lg:block">
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-gray-500">
              Daftar Isi
            </p>
            <TableOfContents sections={sections} />
          </nav>
        </aside>

        <div className="prose prose-gray max-w-3xl prose-headings:font-medium prose-headings:tracking-tight prose-h2:mt-0 prose-h2:text-xl prose-h3:text-base prose-a:text-gray-900 prose-a:underline-offset-2 prose-li:my-1 prose-ol:list-decimal prose-ul:list-disc prose-table:text-sm prose-th:text-left">
          {page.intro && (
            <div className="mb-10 text-gray-600">
              <RichText richContent={page.intro} bare />
            </div>
          )}

          {sections.map((section, index) => (
            <section
              key={section.anchor}
              className="border-t border-gray-100 pt-8 [&:not(:first-of-type)]:mt-10"
            >
              <h2 id={section.anchor} className="scroll-mt-28">
                {index + 1}. {section.heading}
              </h2>
              <SectionBody blocks={section.body ?? []} company={company} />
            </section>
          ))}

          {related.length > 0 && (
            <p className="mt-12 border-t border-gray-100 pt-8 text-sm text-gray-500">
              Baca juga:{" "}
              {related.map((p, i) => (
                <span key={p.slug}>
                  {i > 0 && " · "}
                  <Link href={legalPagePath(p.slug)}>{p.title}</Link>
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
