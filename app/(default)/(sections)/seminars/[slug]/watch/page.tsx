import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SeminarWatch from "@/components/seminars/seminar-watch";
import { getSeminarBySlug } from "@/lib/seminars";
import { seminarMeta } from "@/lib/seminar-format";

export const revalidate = 3600;

type Params = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const seminar = await getSeminarBySlug(slug);
  return {
    title: seminar ? `Watch: ${seminar.title}` : "Watch seminar",
    robots: { index: false, follow: false },
  };
}

export default async function SeminarWatchPage({ params }: Params) {
  const { slug } = await params;
  const seminar = await getSeminarBySlug(slug);
  if (!seminar) notFound();

  const meta = seminarMeta(seminar.seminarDate, seminar.duration);

  return (
    <div className="flex flex-col gap-6">
      <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
        <Link
          href="/seminars"
          className="uppercase tracking-wide transition hover:text-gray-700"
        >
          Seminars
        </Link>
        <span className="mx-2">&gt;</span>
        <Link
          href={`/seminars/${encodeURIComponent(seminar.slug)}`}
          className="transition hover:text-gray-700"
        >
          {seminar.title}
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="font-medium text-gray-900">Watch</span>
      </nav>

      <div className="mx-auto w-full max-w-5xl">
        <SeminarWatch
          slug={seminar.slug}
          title={seminar.title}
          whatsappUrl={process.env.WHATSAPP_URL}
        />
        <div className="mt-6">
          <h1 className="text-2xl font-light tracking-tight text-gray-900 sm:text-3xl">
            {seminar.title}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {[seminar.speaker, meta].filter(Boolean).join(" · ")}
          </p>
        </div>
      </div>
    </div>
  );
}
