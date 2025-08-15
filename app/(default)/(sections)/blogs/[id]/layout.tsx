import { BlogDescriptionSkeleton } from "@/components/skeletons";
import { Blog } from "@/types";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const response = await fetch(
      `https://${process.env.BACKEND_URL}/api/blogs/${id}?select[title]=true&select[overview]=true`,
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
      title: `${blog.title}`,
      description: blog.overview,
    };
  } catch (err) {}
  return {
    title: "Blog",
  };
}

export default function BlogDescriptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<BlogDescriptionSkeleton />}>{children}</Suspense>;
}
