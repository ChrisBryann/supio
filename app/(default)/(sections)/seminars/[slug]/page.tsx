import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PlayCircle } from "lucide-react";
import RichText from "@/components/rich-text/rich-text";
import SeminarAccess from "@/components/seminars/seminar-access";
import { getSeminarBySlug } from "@/lib/seminars";
import { mediaUrl } from "@/lib/seminar-api";
import { seminarMeta } from "@/lib/seminar-format";

export const revalidate = 3600;

type Params = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const seminar = await getSeminarBySlug(slug);
  return { title: seminar?.title ?? "Seminar" };
}

export default async function SeminarDetailPage({ params }: Params) {
  const { slug } = await params;
  const seminar = await getSeminarBySlug(slug);
  if (!seminar) notFound();

  const thumbnailUrl = mediaUrl(seminar.thumbnail);
  const thumbnailAlt =
    typeof seminar.thumbnail === "object" ? seminar.thumbnail?.alt : null;
  const meta = seminarMeta(seminar.seminarDate, seminar.duration);

  return (
    <div className="flex flex-col gap-8">
      <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
        <Link
          href="/seminars"
          className="uppercase tracking-wide transition hover:text-gray-700"
        >
          Seminars
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="font-medium text-gray-900">{seminar.title}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        <div className="relative aspect-video w-full max-w-xl overflow-hidden bg-gray-100">
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={thumbnailAlt || seminar.title}
              fill
              sizes="(max-width: 768px) 100vw, 576px"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sky-50 to-purple-50">
              <PlayCircle className="h-16 w-16 text-gray-300" strokeWidth={1.25} />
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-light tracking-tight text-gray-900 sm:text-4xl">
            {seminar.title}
          </h1>
          {seminar.speaker && (
            <p className="mt-4 text-xl text-gray-800">{seminar.speaker}</p>
          )}
          {meta && <p className="mt-2 text-sm text-gray-500">{meta}</p>}
          {seminar.priceLabel && (
            <p className="mt-6 text-lg font-medium text-gray-900">
              {seminar.priceLabel}
            </p>
          )}

          <div className="mt-8">
            <SeminarAccess
              slug={seminar.slug}
              title={seminar.title}
              purchaseUrl={seminar.purchaseUrl}
              whatsappUrl={process.env.WHATSAPP_URL}
            />
          </div>

          {seminar.description && (
            <RichText
              richContent={seminar.description}
              className="mt-10 text-gray-600"
            />
          )}
        </div>
      </div>
    </div>
  );
}
