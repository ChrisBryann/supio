import { ImageUpload } from "./general";

export interface Partner {
  id: string;
  name: string;
  partner_image?: ImageUpload;
  location: string[];
}
