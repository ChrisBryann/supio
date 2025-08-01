import Image from "next/image";
import RichText from "./rich-text/rich-text";
import { Blog } from "@/types";
import gumletLoader from "@/utils/image-loader";

type Props = {
  blog: Blog;
};

export default function BlogDescriptionPage({ blog }: Props) {
  return (
    <div className="max-w-3xl w-full mx-auto flex flex-col gap-4">
      {/* COVER IMAGE */}
      <div
        className="w-full h-[300px] mx-auto relative"
      >
        <Image
          src={blog.blog_image.url}
          alt={blog.blog_image.alt}
          // width={blog.blog_image.width}
          // height={blog.blog_image.height}
          fill
          // loader={gumletLoader}
          className="rounded-md object-contain"
        />
      </div>
      {/* TITLE */}
      <h1 className="text-5xl font-extrabold">
        {/* Demystifying Vercel: How It Works and How to Create Vercel */}
        {blog.title}
      </h1>
      {/* AUTHOR AND DATE*/}
      <div className="text-gray-900 flex flex-row justify-between">
        {/* Christopher Bryan · Dec 21, 2002 */}
        <p className="text-lg font-semibold">{`${blog.author.first_name} ${blog.author.last_name}`}</p>
        <p>{new Date(blog.updatedAt).toLocaleDateString()}</p>
      </div>
      {/* HORIZONTAL RULE */}
      <hr />
      {/* CONTENT */}
      <RichText richContent={blog.content} />
    </div>
  );
}
