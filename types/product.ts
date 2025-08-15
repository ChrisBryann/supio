import { User } from "next-auth";
import { ImageUpload } from "./general";

export interface Product {
    id: string;
    name: string;
    main_description: string;
    additional_description?: string;
    product_image: ImageUpload;
  }
  