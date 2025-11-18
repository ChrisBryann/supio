import BlogDescriptionPage from "@/components/blog-description";
import { Blog } from "@/types";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const revalidate = 86400;

export async function generateStaticParams() {
  const response = await fetch(
    `https://${process.env.BACKEND_URL}/api/blogs?select[id]=true`,
    {
      headers: {
        "x-frontend-secret": process.env.PAYLOAD_FRONTEND_SHARED_SECRET || "",
      },
    }
  );

  if (!response.ok) {
    return [];
  }
  const data: any = await response.json();
  const blogs: Blog[] = data.docs;
  return blogs;
}

export default async function BlogDescription({ params }: Props) {
  const { id } = await params;
  const response = await fetch(
    `http://${process.env.BACKEND_URL}/api/blogs/${id}`,
    {
      cache: "no-store",
      headers: {
        "x-frontend-secret": process.env.PAYLOAD_FRONTEND_SHARED_SECRET || "",
      },
    }
  );
  console.log("RESPONSE STATUS:", response.status);
  
  if (!response.ok) {
    console.error("BAD RESPONSE:", response.status, response.statusText);
    return notFound();
  }
  const blog: Blog = await response.json();

  return <BlogDescriptionPage blog={blog} />;
}
