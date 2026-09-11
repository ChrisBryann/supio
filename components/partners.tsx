import Image from "next/image";
import { Partner } from "@/types";

type Props = {
  partners: Partner[];
};

export default function Partners({ partners }: Props) {
  const withLogos = partners.filter((p) => p.partner_image?.url);

  if (withLogos.length === 0) return null;

  // Duplicate the list so the marquee track can loop seamlessly (the keyframe
  // translates by -50%, i.e. exactly one copy width).
  const track = [...withLogos, ...withLogos];

  return (
    <section className="relative bg-white py-16 md:py-24">
      <div className="mx-auto max-w-site px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-14" data-aos="fade-up">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-gray-500">
            Our Trusted Partners
          </p>
          <h2 className="text-3xl font-light tracking-tight text-gray-900 sm:text-4xl">
            Available Across Indonesia
          </h2>
        </div>
      </div>

      {/* Marquee: edges faded via mask so logos glide in/out softly. */}
      <div
        className="group relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee items-center gap-16 pr-16 motion-reduce:animate-none group-hover:[animation-play-state:paused]">
          {track.map((partner, i) => (
            <div
              key={`${partner.id}-${i}`}
              className="relative h-16 w-36 shrink-0"
              aria-hidden={i >= withLogos.length ? true : undefined}
            >
              <Image
                src={partner.partner_image!.url}
                alt={partner.partner_image!.alt || partner.name}
                fill
                sizes="144px"
                className="object-contain opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
