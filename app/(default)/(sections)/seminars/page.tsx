import type { Metadata } from "next";
import SeminarCard from "@/components/seminars/seminar-card";
import { getSeminars } from "@/lib/seminars";
import { mediaUrl } from "@/lib/seminar-api";
import { seminarMeta } from "@/lib/seminar-format";

// The catalogue is public and identical for every visitor.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Seminars",
  description:
    "Recorded clinical aesthetics seminars by SCI Aesthetics. Purchase a seminar and watch it anytime.",
};

export default async function SeminarsPage() {
  const seminars = await getSeminars();

  return (
    <div className="flex flex-col gap-10">
      <div className="max-w-2xl" data-aos="fade-up">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-gray-500">
          Our Seminars
        </p>
        <h1 className="text-3xl font-light leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
          Clinical Education, On Demand.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-500">
          Recorded seminars from practitioners in clinical aesthetics. Purchase
          a seminar to watch it anytime, from anywhere.
        </p>
      </div>

      {seminars === null ? (
        <p className="py-16 text-center text-gray-500">
          Seminars couldn&apos;t be loaded right now. Please try again later.
        </p>
      ) : seminars.length === 0 ? (
        <p className="py-16 text-center text-gray-500">
          No seminars are available yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {seminars.map((seminar) => (
            <SeminarCard
              key={seminar.id}
              href={`/seminars/${encodeURIComponent(seminar.slug)}`}
              title={seminar.title}
              thumbnailUrl={mediaUrl(seminar.thumbnail)}
              thumbnailAlt={
                typeof seminar.thumbnail === "object" ? seminar.thumbnail?.alt : null
              }
              speaker={seminar.speaker}
              meta={seminarMeta(seminar.seminarDate, seminar.duration)}
              footer={
                seminar.priceLabel ? (
                  <span className="text-sm font-medium text-gray-900">
                    {seminar.priceLabel}
                  </span>
                ) : null
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
