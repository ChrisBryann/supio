import { auth } from "@/auth";
import {
  addBlog,
  getBlogById,
  getBlogs,
  updateBlog,
} from "@/services/blogs/blogs.service";
import { Blog, EditorContentImage } from "@/types";
import { NextResponse } from "next/server";
import z from "zod";

// POST/PATCH Form Schema
export const BlogFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  cover_image_url: z.url().min(1, "Cover Image URL is required"),
  content: z.string().min(1, "Content is required"),
  status: z.enum(["draft", "published"]),
});

export type TBlogFormSchema = z.infer<typeof BlogFormSchema>;
// REQUEST BODY TYPES
export type BlogPostBody = TBlogFormSchema & {
  content_images: EditorContentImage[];
};
export type BlogPatchBody = TBlogFormSchema &
  Pick<Blog, "id"> & { content_images: EditorContentImage[] };

export const GET = auth(async function GET(request, { params }) {
  // if (!request.auth)
  //   return NextResponse.json(
  //     {},
  //     { status: 500, statusText: "Not authenticated" }
  //   );
  try {
    if (request.nextUrl.searchParams.has("id")) {
      // GET /api/products?id=[product_id]
      const blog = await getBlogById(request.nextUrl.searchParams.get("id")!);
      return NextResponse.json(blog, {
        status: 200,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    } else if (
      request.nextUrl.searchParams.has("doc_limit") ||
      request.nextUrl.searchParams.size === 0
    ) {
      // GET /api/products
      const doc_limit = request.nextUrl.searchParams.has("doc_limit")
        ? +request.nextUrl.searchParams.get("doc_limit")!
        : 0;
      const blogs = await getBlogs(doc_limit);
      return NextResponse.json(blogs, {
        status: 200,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    } else {
      // invalid GET requests
      return NextResponse.json(
        {},
        { status: 500, statusText: "Invalid request!" }
      );
    }
  } catch (err) {
    return NextResponse.json(
      {
        error: `Error: ${err}`,
      },
      { status: 500 }
    );
  }
});

export const POST = auth(async function POST(request) {
  if (!request.auth)
    return NextResponse.json(
      {},
      { status: 500, statusText: "Not authenticated" }
    );
  try {
    const body = await request.json();
    if (body) {
      // POST /api/products BODY: blog object
      await addBlog(body as BlogPostBody);
      return NextResponse.json(
        {},
        {
          status: 200,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (err) {
    return NextResponse.json(
      {
        error: `Error: ${err}`,
      },
      { status: 500 }
    );
  }
});
export const PATCH = auth(async function PATCH(request) {
  if (!request.auth)
    return NextResponse.json(
      {},
      { status: 500, statusText: "Not authenticated" }
    );
  try {
    const body = await request.json();
    if (body) {
      // PATCH /api/products BODY {product: Product}
      await updateBlog(body as BlogPatchBody);

      return NextResponse.json(
        {},
        {
          status: 200,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (err) {
    return NextResponse.json(
      {
        error: `Error: ${err}`,
      },
      { status: 500 }
    );
  }
});
