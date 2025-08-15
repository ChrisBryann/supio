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
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="py-8">
          {children}
        </div>
      </div>
    </section>
  );
}
