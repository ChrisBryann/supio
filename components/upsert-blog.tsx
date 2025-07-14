"use client";
import { useState } from "react";
import RichEditor from "./ui/rich-editor";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";

const BlogFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  cover_image_url: z.url().min(1, "Cover Image URL is required"),
  content: z.string().min(1, "Content is required"),
});

type TBlogFormSchema = z.infer<typeof BlogFormSchema>;

export default function UpsertBlogPage() {
  const [content, useContent] = useState<string>("");
  const form = useForm<TBlogFormSchema>({
    resolver: zodResolver(BlogFormSchema),
    defaultValues: {
      title: "",
      category: "",
      cover_image_url: "",
      content: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  return (
    <div className="mx-auto">
      <div className="flex flex-col space-y-8">
        <h1 className="text-3xl font-semibold mx-auto">Create a new post</h1>
        <Form {...form}>
          <form className="space-y-4 rounded-lg w-3/4 mx-auto">
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
                    <RichEditor content={content} onChange={useContent} />
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
