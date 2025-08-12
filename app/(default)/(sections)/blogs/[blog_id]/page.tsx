import BlogDescriptionPage from "@/components/blog-description";
import { BlogDescriptionSkeleton } from "@/components/skeletons";
import { Blog } from "@/types";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    blog_id: string;
  }>;
};

export const revalidate = 86400;

export async function generateStaticParams() {
  const response = await fetch(
    `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs?select[id]=true`,
    {
      headers: {
        "x-frontend-secret": process.env.PAYLOAD_FRONTEND_SHARED_SECRET || "",
      },
    }
  );
  const data: any = await response.json();
  if (!response.ok) {
    console.error(data);
    return [];
  }
  const blogs: Blog[] = data.docs;
  return blogs;
}

export default async function BlogDescription({ params }: Props) {
  const { blog_id } = await params;
  const response = await fetch(
    `http://${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${blog_id}`,
    {
      cache: "no-store",
      headers: {
        "x-frontend-secret": process.env.PAYLOAD_FRONTEND_SHARED_SECRET || "",
      },
    }
  );
  const blog: Blog = await response.json();
  if (!response.ok) {
    return notFound();
  }

  return <BlogDescriptionPage blog={blog} />;
}
