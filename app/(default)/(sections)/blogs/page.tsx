import BlogPage from "@/components/blog";
import { Blog } from "@/types";
import { notFound } from "next/navigation";

export const revalidate = 86400;

export default async function Blogs() {
  const response = await fetch(
    `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs`,
    {
      headers: {
        "x-frontend-secret": process.env.PAYLOAD_FRONTEND_SHARED_SECRET || "",
      },
    }
  );
  const data: any = await response.json();
  if (!response.ok) {
    
    notFound();
  }
  const blogs: Blog[] = data.docs;
  //   {
  //     id: "aad1813a-4ec7-4f22-bb00-ba06a4b0b8e2",

  //     author: {
  //       id: "a2a54b59-1269-4b2a-8104-2445ef363315",
  //       first_name: "Christopher",
  //       last_name: "Bryan",

  //       roles: ["admin", "viewer"],
  //       updatedAt: "2025-07-29T22:13:07.557Z",
  //       createdAt: "2025-07-28T21:38:50.591Z",
  //       email: "christopher_bryan@rocketmail.com",

  //       sessions: [
  //         {
  //           id: "4bae4cc0-42ef-4014-b367-51d3b6d0785d",
  //           createdAt: "2025-07-29T22:13:07.555Z",
  //           expiresAt: "2025-07-30T00:13:07.555Z",
  //         },
  //       ],
  //     },
  //     title: "testing blog",
  //     overview: "this is to test what the blog looks like",
  //     content: {
  //       root: {
  //         type: "root",
  //         format: "",
  //         indent: 0,
  //         version: 1,

  //         children: [
  //           {
  //             type: "paragraph",
  //             format: "",
  //             indent: 0,
  //             version: 1,

  //             children: [
  //               {
  //                 mode: "normal",
  //                 text: "hey all this is my first blog.",
  //                 type: "text",
  //                 style: "",
  //                 detail: 0,
  //                 format: 0,
  //                 version: 1,
  //               },
  //             ],
  //             direction: "ltr",
  //             textStyle: "",
  //             textFormat: 0,
  //           },

  //           {
  //             type: "paragraph",
  //             format: "",
  //             indent: 0,
  //             version: 1,

  //             children: [
  //               {
  //                 mode: "normal",
  //                 text: "testing this coding script",
  //                 type: "text",
  //                 style: "",
  //                 detail: 0,
  //                 format: 16,
  //                 version: 1,
  //               },
  //             ],
  //             direction: "ltr",
  //             textStyle: "",
  //             textFormat: 16,
  //           },

  //           {
  //             id: "6889493caaa7155642905ae0",
  //             type: "upload",

  //             value: {
  //               id: "6f748200-fe48-4edc-8501-25aabc269d0b",
  //               alt: "dwade and lebron dunk",
  //               folder: null,
  //               updatedAt: "2025-07-29T22:20:43.852Z",
  //               createdAt: "2025-07-29T22:20:42.039Z",
  //               url: "https://supio-59x964fid-chrisbryanns-projects.vercel.app/api/media/file/OIP.webp",
  //               thumbnailURL: null,
  //               filename: "OIP.webp",
  //               mimeType: "image/webp",
  //               filesize: 49436,
  //               width: 474,
  //               height: 428,
  //               focalX: 50,
  //               focalY: 50,
  //             },
  //             fields: null,
  //             format: "",
  //             version: 3,
  //             relationTo: "media",
  //           },

  //           {
  //             type: "paragraph",
  //             format: "",
  //             indent: 0,
  //             version: 1,

  //             children: [],
  //             direction: null,
  //             textStyle: "",
  //             textFormat: 0,
  //           },
  //         ],
  //         direction: "ltr",
  //         textFormat: 16,
  //       },
  //     },
  //     tags: "testing",

  //     blog_image: {
  //       id: "f6a2fa37-120c-4408-ba5a-592b594168c1",
  //       alt: "dwade and lebron miami heat",
  //       folder: null,
  //       updatedAt: "2025-07-29T22:21:39.636Z",
  //       createdAt: "2025-07-29T22:21:37.789Z",
  //       url: "https://supio-59x964fid-chrisbryanns-projects.vercel.app/api/media/file/OIP-1.webp",
  //       thumbnailURL: null,
  //       filename: "OIP-1.webp",
  //       mimeType: "image/webp",
  //       filesize: 19258,
  //       width: 474,
  //       height: 316,
  //       focalX: 50,
  //       focalY: 50,
  //     },
  //     updatedAt: "2025-07-29T23:02:57.233Z",
  //     createdAt: "2025-07-29T22:21:49.718Z",
  //     _status: "published",
  //   },
  //   // {
  //   //   title: "how to do this",
  //   //   id: "434",
  //   //   author: {
  //   //     email: "chris@123gmail.com",
  //   //     id: "user1234",
  //   //     name: "Chris Gordon",
  //   //     image: "https://picsum.photos/300",
  //   //   },
  //   //   cover_image_url: "https://picsum.photos/200",
  //   //   tags: "Development",
  //   //   content: "<p>Do you know how to do this? Because I do.<p>",
  //   //   published_at: new Date(Date.now()),

  //   //   overview: "this is tutorial on how to do this stuff",
  //   // },
  //   // {
  //   //   title: "how to do this",
  //   //   id: "234",
  //   //   author: {
  //   //     email: "chris@123gmail.com",
  //   //     id: "user1234",
  //   //     name: "Chris Gordon",
  //   //     image: "https://picsum.photos/300",
  //   //   },
  //   //   cover_image_url: "https://picsum.photos/200",
  //   //   tags: "Development",
  //   //   content: "<p>Do you know how to do this? Because I do.<p>",
  //   //   published_at: new Date(Date.now()),

  //   //   overview: "this is tutorial on how to do this stuff",
  //   // },
  // ];
  return <BlogPage blogs={blogs} />;
}
