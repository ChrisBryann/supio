import { User } from "next-auth";

export interface Product {
  id: string;
  name: string;
  main_description: string;
  additional_description?: string;
  image_url: string;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  author: User; // author ID from next auth Users (stored as author_id in DB)
  status: 'draft' | 'published';
  category: string; // using Badge component to display category
  cover_image_url: string; // URL to blog's cover image
  published_at: Date; // published date
}
