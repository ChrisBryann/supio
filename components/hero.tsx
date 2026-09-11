import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Full-bleed hero background image (the gradient blob artwork).
          Runtime path (not a static import) so the build succeeds before the
          asset is added; save the PNG at public/images/hero-background.png. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image
          src="/images/hero-background.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>

      {/* Bottom fade blends the artwork into the white products section below,
          removing the hard seam. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-white md:h-64"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-site px-6 lg:px-8">
        {/* Content anchored lower-left over the artwork. */}
        <div className="flex min-h-[78vh] flex-col justify-center pb-20 pt-32 md:min-h-[108vh] md:pb-28 md:pt-40">
          <div className="max-w-xl" data-aos="fade-up">
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-gray-500">
              SCI Aesthetics
            </p>
            <h1 className="text-3xl font-light leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              High Quality,
              <br />
              Innovation-Driven,
              <br />
              and Clinically
              <br />
              Grounded Solutions.
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
