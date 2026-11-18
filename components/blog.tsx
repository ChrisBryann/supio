import Image from "next/image";
import Link from "next/link";
import { Newspaper } from "lucide-react";
import { Blog } from "@/types";
import { formatSeminarDate } from "@/lib/seminar-format";

type Props = {
  // null = the list couldn't be loaded.
  blogs: Blog[] | null;
};

// "Research · 3 Nov 2025" — skips whichever parts are missing.
export function blogMeta(blog: Blog) {
  return [blog.tags, formatSeminarDate(blog.updatedAt)].filter(Boolean).join(" · ") || null;
}

function Cover({ blog, sizes, priority }: { blog: Blog; sizes: string; priority?: boolean }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
      {blog.blog_image?.url ? (
        <Image
          src={blog.blog_image.url}
          alt={blog.blog_image.alt || blog.title}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sky-50 to-purple-50">
          <Newspaper className="h-12 w-12 text-gray-300" strokeWidth={1.25} />
        </div>
      )}
    </div>
  );
}

function FeaturedPost({ blog }: { blog: Blog }) {
  const meta = blogMeta(blog);
  return (
    <Link
      href={`/blogs/${blog.id}`}
      className="group grid items-center gap-6 md:grid-cols-2 md:gap-12"
      data-aos="fade-up"
    >
      <Cover blog={blog} sizes="(max-width: 768px) 100vw, 50vw" priority />
      <div className="flex flex-col">
        {meta && (
          <p className="text-xs font-medium uppercase tracking-widest text-gray-500">{meta}</p>
        )}
        <h2 className="mt-3 text-2xl font-light leading-snug tracking-tight text-gray-900 group-hover:text-gray-600 sm:text-3xl">
          {blog.title}
        </h2>
        {blog.overview && (
          <p className="mt-4 line-clamp-3 text-base leading-relaxed text-gray-500">
            {blog.overview}
          </p>
        )}
        <span className="mt-6 text-sm font-medium text-gray-900">Read article →</span>
      </div>
    </Link>
  );
}

function BlogCard({ blog }: { blog: Blog }) {
  const meta = blogMeta(blog);
  return (
    <Link href={`/blogs/${blog.id}`} className="group flex flex-col">
      <Cover blog={blog} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
      {meta && <p className="mt-4 text-sm text-gray-500">{meta}</p>}
      <p className="mt-1 text-lg font-medium leading-snug text-gray-900 group-hover:text-gray-600">
        {blog.title}
      </p>
      {blog.overview && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-500">{blog.overview}</p>
      )}
    </Link>
  );
}

export default function BlogPage({ blogs }: Props) {
  const [featured, ...rest] = blogs ?? [];

  return (
    <div className="flex flex-col gap-10">
      <div className="max-w-2xl" data-aos="fade-up">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-gray-500">
          Our Blog
        </p>
        <h1 className="text-3xl font-light leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
          Insights &amp; Updates
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-500">
          News, research and practical insights on clinical aesthetics from SCI
          Aesthetics.
        </p>
      </div>

      {blogs === null ? (
        <p className="py-16 text-center text-gray-500">
          Articles couldn&apos;t be loaded right now. Please try again later.
        </p>
      ) : !featured ? (
        <p className="py-16 text-center text-gray-500">No articles have been published yet.</p>
      ) : (
        <>
          <div className="border-t border-gray-200 pt-10">
            <FeaturedPost blog={featured} />
          </div>
          {rest.length > 0 && (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 border-t border-gray-200 pt-10 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
