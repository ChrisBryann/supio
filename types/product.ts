import { User } from "next-auth";

export interface Product {
    id: string;
    name: string;
    main_description: string;
    additional_description?: string;
    image_url: string;
    createdBy: User
  }
  