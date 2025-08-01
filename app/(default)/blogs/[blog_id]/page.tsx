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
    `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${blog_id}`
  );
  const data = await response.json();
  if (!response.ok) {
    console.log(data);
    return null;
  }

  console.log(data)

  return <BlogDescriptionPage blog={data as Blog} />;
}
