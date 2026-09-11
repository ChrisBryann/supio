import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "SCI Aesthetics | Revivsome Clinical Exosome for Skin Rejuvenation",
    template: 'SCI Aesthetics | %s'
  },
  description: "Discover Revivsome by SCI Aesthetics, a clinical-grade exosome treatment for glowing skin, acne scars, and anti-aging. Trusted by top aesthetic clinics in Indonesia.",
}

export default function SectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* max-w-site + padding match the header/landing so content aligns with
          the logo; pt offset clears the fixed site header (h-20). */}
      <div className="max-w-site mx-auto px-6 lg:px-8">
        <div className="pt-28 pb-8">
          {children}
        </div>
      </div>
    </section>
  );
}
