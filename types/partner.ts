import { ImageUpload } from "./general";

export interface Partner {
  id: string;
  name: string;
  partner_image?: ImageUpload;
  location: string[];
  // CMS flag: whether this partner appears in the landing-page logo cloud.
  show_at_landing?: boolean;
}
