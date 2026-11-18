import Image from "next/image";
import Link from "next/link";
import RichText from "./rich-text/rich-text";
import { Blog } from "@/types";
import { formatSeminarDate } from "@/lib/seminar-format";

type Props = {
  blog: Blog;
};

export default function BlogDescriptionPage({ blog }: Props) {
  const author = [blog.author?.first_name, blog.author?.last_name].filter(Boolean).join(" ");
  const byline = [author && `By ${author}`, formatSeminarDate(blog.updatedAt)]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="flex flex-col gap-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
        <Link href="/blogs" className="uppercase tracking-wide transition hover:text-gray-700">
          Blogs
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="font-medium text-gray-900">{blog.title}</span>
      </nav>

      {/* Title block */}
      <header className="mx-auto w-full max-w-3xl" data-aos="fade-up">
        {blog.tags && (
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-gray-500">
            {blog.tags}
          </p>
        )}
        <h1 className="text-3xl font-light leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
          {blog.title}
        </h1>
        {blog.overview && (
          <p className="mt-5 text-lg leading-relaxed text-gray-500">{blog.overview}</p>
        )}
        {byline && <p className="mt-6 text-sm text-gray-500">{byline}</p>}
      </header>

      {/* Cover */}
      {blog.blog_image?.url && (
        <div className="relative mx-auto aspect-[16/9] w-full max-w-5xl overflow-hidden bg-gray-100">
          <Image
            src={blog.blog_image.url}
            alt={blog.blog_image.alt || blog.title}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      {blog.content && (
        <RichText
          richContent={blog.content}
          className="mx-auto max-w-3xl prose-gray prose-headings:font-medium prose-headings:tracking-tight prose-a:text-gray-900 prose-a:underline-offset-2 prose-img:my-8"
        />
      )}

      <div className="mx-auto w-full max-w-3xl border-t border-gray-200 pt-8">
        <Link
          href="/blogs"
          className="text-sm font-medium text-gray-900 transition hover:text-gray-600"
        >
          ← All articles
        </Link>
      </div>
    </article>
  );
}
