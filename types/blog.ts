import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { User } from "next-auth";
import { ImageUpload } from "./general";

export interface Blog {
    id: string;
    title: string;
    overview: string;
    content: SerializedEditorState;
    author: {
      id: string;
      first_name: string;
      last_name: string;
    }; // author ID from next auth Users (stored as author_id in DB)
    // status: 'draft' | 'published'; // no need status because all blogs fetched will be published
    tags: string; // using Badge component to display category
    blog_image: ImageUpload; // URL to blog's cover image
    updatedAt: string; // published date
    createdAt: string;
    _status: string; // will always be published
  }
  