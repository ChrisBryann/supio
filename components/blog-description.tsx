import Image from "next/image";
import RichText from "./rich-text/rich-text";
import { Blog } from "@/types";
import { Separator } from "./ui/separator";

type Props = {
  blog: Blog;
};

export default function BlogDescriptionPage({ blog }: Props) {
  return (
    <div className={`max-w-4xl w-full mx-auto flex flex-col gap-4`}>
      {/* COVER IMAGE */}
      <div className="w-full mx-auto relative">
        <Image
          src={blog.blog_image.url}
          alt={blog.blog_image.alt}
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ width: "100%", height: "350px" }}
          className="rounded-md object-cover"
        />
      </div>
      {/* TITLE */}
      <h1 className="text-5xl font-extrabold">
        {/* Demystifying Vercel: How It Works and How to Create Vercel */}
        {blog.title}
      </h1>
      {/* AUTHOR AND DATE*/}
      <div className="text-gray-900 flex flex-row gap-4 items-center">
        {/* Christopher Bryan · Dec 21, 2002 */}
        <p className="text-lg font-semibold">{`${blog.author.first_name} ${blog.author.last_name}`}</p>
        <p>{new Date(blog.updatedAt).toLocaleDateString()}</p>
      </div>
      {/* HORIZONTAL RULE */}
      <Separator />
      {/* CONTENT */}
      <RichText className="pt-4 max-w-full" richContent={blog.content} />
    </div>
  );
}
