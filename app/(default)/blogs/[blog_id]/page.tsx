import BlogDescriptionPage from "@/components/blog-description";
import { BlogDescriptionSkeleton } from "@/components/skeletons";
import { Blog } from "@/types";

type Props = {
  params: Promise<{
    blog_id: string;
  }>;
};

export default async function BlogDescription({ params }: Props) {
  const { blog_id } = await params;
  const response = await fetch(
    `http://${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${blog_id}`,
    {
      cache: "no-store",
      headers: {
        'x-frontend-secret': process.env.PAYLOAD_FRONTEND_SHARED_SECRET || '',
      }
    }
  );
  const data = await response.json();
  if (!response.ok) {
    console.log(data);
    return null;
  }


  return <BlogDescriptionPage blog={data as Blog} />;
}
