import type { Metadata } from "next";
import BlogPage from "@/components/blog";
import { Blog } from "@/types";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "News, research and practical insights on clinical aesthetics from SCI Aesthetics.",
};

// null = couldn't be loaded (the page shows a message instead of a 404).
async function getBlogs(): Promise<Blog[] | null> {
  try {
    const response = await fetch(
      `https://${process.env.BACKEND_URL}/api/blogs?sort=-updatedAt&limit=100&depth=1`,
      {
        headers: {
          "x-frontend-secret": process.env.PAYLOAD_FRONTEND_SHARED_SECRET || "",
        },
      }
    );
    if (!response.ok) {
      console.error("BAD RESPONSE:", response.status, response.statusText);
      return null;
    }
    const data = await response.json();
    return data.docs ?? [];
  } catch (error) {
    console.error("[blogs] fetch error:", error);
    return null;
  }
}

export default async function Blogs() {
  const blogs = await getBlogs();
  return <BlogPage blogs={blogs} />;
}
