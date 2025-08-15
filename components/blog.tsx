import Image from "next/image";
import { Blog } from "@/types";
import { Badge } from "./ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import { Toggle } from "./ui/toggle";
import { Button } from "./ui/button";

type Props = {
  blogs: Blog[];
};

export default function BlogPage({ blogs }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Explore Our Blog</h1>
      {/* <div className="flex flex-row gap-2 left-0">
        <Toggle variant={"outline"}>All</Toggle>
        <Toggle variant={"outline"}>Research</Toggle>
        <Toggle variant={"outline"}>Study Case</Toggle>
        <Toggle variant={"outline"}>News</Toggle>
        <Toggle variant={"outline"}>Trending</Toggle>
      </div> */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => {
          return (
            <Card key={blog.id}>
              <div className="relative h-[200px] w-full">
                <Link href={`/blogs/${blog.id}`}>
                  <Image
                    className="rounded-t object-cover object-center"
                    src={blog.blog_image.url}
                    // width={400}
                    // height={200}
                    fill
                    alt={blog.blog_image.alt}
                  />
                </Link>
              </div>

              <CardHeader className="flex-col items-start">
                <CardDescription>
                  <Badge>{blog.tags}</Badge>
                </CardDescription>

                <CardTitle className="text-lg md:text-xl font-semibold hover:underline">
                  <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
                </CardTitle>
                <CardDescription>
                  {new Date(blog.updatedAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="px-0" variant={"link"} asChild>
                  <Link href={`/blogs/${blog.id}`}>Read more →</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
