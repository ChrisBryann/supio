import BlogPage from "@/components/blog";
import { Blog } from "@/types";
export default async function Blogs() {
  const blogs: Blog[] = [
    {
      title: "how to do this",
      id: "1234",
      author: {
        email: "chris@123gmail.com",
        id: "user1234",
        name: "Chris Gordon",
        image: "https://picsum.photos/100",
      },
      cover_image_url: "https://picsum.photos/300",
      category: "Development",
      content: "<p>Do you know how to do this? Because I do.<p>",
      published_at: new Date(Date.now()),
      status: "published",
    },
    {
        title: "how to do this",
        id: "434",
        author: {
          email: "chris@123gmail.com",
          id: "user1234",
          name: "Chris Gordon",
          image: "https://picsum.photos/300",
        },
        cover_image_url: "https://picsum.photos/200",
        category: "Development",
        content: "<p>Do you know how to do this? Because I do.<p>",
        published_at: new Date(Date.now()),
        status: "published",
      },
      {
        title: "how to do this",
        id: "234",
        author: {
          email: "chris@123gmail.com",
          id: "user1234",
          name: "Chris Gordon",
          image: "https://picsum.photos/300",
        },
        cover_image_url: "https://picsum.photos/200",
        category: "Development",
        content: "<p>Do you know how to do this? Because I do.<p>",
        published_at: new Date(Date.now()),
        status: "published",
      },

  ];
  return <BlogPage blogs={blogs} />;
}
