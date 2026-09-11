import Image from "next/image";
import BrandLogo from "@/public/images/brand-logo-colored.png";
import Link from "next/link";

function SocialRow({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      className="flex items-center justify-between border-t border-gray-200 py-4 text-gray-800 transition hover:text-gray-500"
    >
      <span className="flex items-center gap-3">
        <span className="text-gray-600">{icon}</span>
        <span className="text-sm font-medium uppercase tracking-wide">
          {label}
        </span>
      </span>
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </Link>
  );
}

export default function Footer() {
  const instagramUrl = process.env.INSTAGRAM_URL;
  const whatsappUrl = process.env.WHATSAPP_URL;

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-site px-6 lg:px-8">
        <div className="grid gap-10 border-t border-gray-200 py-12 md:grid-cols-2 md:py-16">
          {/* Brand + address */}
          <div>
            <Link href="/">
              <Image
                className="rounded hover:cursor-pointer"
                src={BrandLogo}
                width={260}
                height={80}
                alt="SUPIO Cosmetics Indonesia"
                data-aos="fade-up"
              />
            </Link>
            <address className="mt-6 max-w-xs text-sm not-italic leading-relaxed text-gray-500">
              Ciputra World Office Unit 1003, Jl. Mayjen Sungkono No.87 Lantai
              10, Gn. Sari, Kec. Dukuhpakis, Surabaya, Jawa Timur 60224
            </address>
          </div>

          {/* Social links */}
          <div className="md:pl-8">
            {instagramUrl && (
              <SocialRow
                href={instagramUrl}
                label="Instagram"
                icon={
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 50 50">
                    <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z" />
                  </svg>
                }
              />
            )}
            {whatsappUrl && (
              <SocialRow
                href={whatsappUrl}
                label="WhatsApp"
                icon={
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.078 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                }
              />
            )}
            <div className="border-t border-gray-200" />
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 py-6 text-center text-xs text-gray-400">
          © Copyright 2024 · PT SUPIO COSMETICS INDONESIA
        </div>
      </div>
    </footer>
  );
}
