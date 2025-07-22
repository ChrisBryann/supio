"use client";
import { useCallback, useEffect, useState } from "react";
import RichEditor from "./ui/rich-editor";
import { useFieldArray, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";
import { BASE_URL } from "@/utils/url";
import { Blog, EditorContentImage } from "@/types";
import { useRouter } from "next/navigation";
import { getContentImageUrlsById } from "@/services/blogs/blogs.service";
import { BlogFormSchema, BlogPatchBody, BlogPostBody, TBlogFormSchema } from "@/app/api/blogs/route";

type AddProps = {
  blog: null;
  mode: "add";
};

type EditProps = {
  blog: Blog;
  mode: "edit";
};

type Props = AddProps | EditProps;

export default function UpsertBlogPage({ blog, mode }: Props) {
  const router = useRouter();
  const [content, useContent] = useState<string>("");
  const [contentImages, setContentImages] = useState<EditorContentImage[]>([]);
  const [loadingContentImages, setLoadingContentImages] =
    useState<boolean>(false);
  const form = useForm<TBlogFormSchema>({
    resolver: zodResolver(BlogFormSchema),
    defaultValues:
      mode === "edit"
        ? {
            title: blog.title,
            category: blog.category,
            cover_image_url: blog.cover_image_url,
            status: blog.status,
            content: blog.content,
          }
        : {
            title: "",
            category: "",
            cover_image_url: "",
            status: "draft",
            content: "",
          },
  });

  const onSubmitForm = async (values: TBlogFormSchema) => {
    const body =
      mode === "edit"
        ? ({
            ...values,
            id: blog.id,
            content_images: contentImages,
          } as BlogPatchBody)
        : ({
            ...values,
            content_images: contentImages,
          } as BlogPostBody);
    const response = await fetch(`${BASE_URL}/api/blogs`, {
      method: mode == "edit" ? "PATCH" : "POST",
      body: JSON.stringify(body),
    });
    const data: Blog = await response.json();
    router.replace(`/blog/${mode === "edit" ? blog.id : data.id}`);
  };

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    console.log("updated content_images:", contentImages);
  }, [contentImages]);

  const handleUploadImageNode = useCallback(
    (name: string, url: string) => {
      // append content_images array with the url
      setContentImages((prev) => [
        ...prev,
        {
          name,
          url,
          is_added: true, // just got added in editor
        },
      ]);
    },
    [setContentImages]
  );

  const handleDeleteImageNode = useCallback(
    (url: string) => {
      // filter out this url from content_images var
      setContentImages((prev) => prev.filter((img) => img.url !== url));
    },
    [setContentImages]
  );

  useEffect(() => {
    // when page just got loaded
    if (mode === "edit" && blog) {
      // load in the image urls from Firebase Storage for this blog entry into content_images
      const getUrls = async () => {
        setLoadingContentImages(true);
        const contentImagesObj = await getContentImageUrlsById(blog.id);
        setContentImages(contentImagesObj);
        setLoadingContentImages(false);
      };
      getUrls();
    }
  }, []);

  return (
    <div className="mx-auto">
      <div className="flex flex-col space-y-8">
        <h1 className="text-3xl font-semibold mx-auto">Create a new post</h1>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="space-y-4 rounded-lg w-3/4 mx-auto"
          >
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="title">
                    Title<span className="text-red-700">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="title"
                      className=" font-bold"
                      //   className="w-full text-3xl font-bold placeholder:font-normal border-0 focus:ring-0 focus:ring-offset-0"
                      //   placeholder="Title"
                      required={true}
                      type="text"
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="category">
                    Category<span className="text-red-700">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="category"
                      required={true}
                      //   className="w-1/2 border-0 focus:ring-0 focus:ring-offset-0"
                      className="w-min"
                      type="text"
                      onChange={field.onChange}
                      //   placeholder="Category"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="cover_image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="cover_image_url">
                    Cover Image URL (.jpg)
                    <span className="text-red-700">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="cover_image_url"
                      className="w-min border-0 focus:ring-0 focus:ring-offset-0"
                      required={true}
                      type="file"
                      accept=".jpg"
                      placeholder="Cover Image URL (.jpg)"
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="content">
                    Content<span className="text-red-700">*</span>
                  </FormLabel>
                  <FormControl id="content">
                    <RichEditor
                      content={content}
                      onChange={useContent}
                      isLoadingContentImages={loadingContentImages}
                      handleDeleteImageNode={handleDeleteImageNode}
                      handleUploadImageNode={handleUploadImageNode}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              className="font-medium"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <LoaderCircle className="size-5 animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </div>

      {/* <article
        className="col-span-2 rounded-xl p-4"
        dangerouslySetInnerHTML={{ __html: content }}
      /> */}
    </div>
  );
}
