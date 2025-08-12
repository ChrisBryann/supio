import { BlogDescriptionSkeleton } from "@/components/skeletons";
import { Blog } from "@/types";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

type Props = {
  params: Promise<{
    blog_id: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { blog_id } = await params;
  try {
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${blog_id}?select[title]=true&select[overview]=true`,
      {
        headers: {
          "x-frontend-secret": process.env.PAYLOAD_FRONTEND_SHARED_SECRET || "",
        },
      }
    );
    if (!response.ok) {
      redirect("/");
    }

    const blog: Blog = await response.json();
    return {
      title: `SCI Aesthetics | ${blog.title}`,
      description: blog.overview,
    };
  } catch (err) {}
  return {
    title: "SCI Aesthetics | Blog",
  };
}

export default function BlogDescriptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<BlogDescriptionSkeleton />}>{children}</Suspense>;
}
