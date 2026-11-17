import Image from "next/image";
import Link from "next/link";
import { PlayCircle } from "lucide-react";

type Props = {
  href: string;
  title: string;
  thumbnailUrl: string | null;
  thumbnailAlt?: string | null;
  speaker?: string | null;
  meta?: string | null;
  footer?: React.ReactNode;
};

export default function SeminarCard({
  href,
  title,
  thumbnailUrl,
  thumbnailAlt,
  speaker,
  meta,
  footer,
}: Props) {
  return (
    <Link href={href} className="group flex flex-col">
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={thumbnailAlt || title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sky-50 to-purple-50">
            <PlayCircle className="h-12 w-12 text-gray-300" strokeWidth={1.25} />
          </div>
        )}
      </div>
      {meta && <p className="mt-4 text-sm text-gray-500">{meta}</p>}
      <p className="mt-1 text-lg font-medium leading-snug text-gray-900 group-hover:text-gray-600">
        {title}
      </p>
      {speaker && <p className="text-sm text-gray-500">{speaker}</p>}
      {footer && <div className="mt-2">{footer}</div>}
    </Link>
  );
}
