export interface ImageUpload {
  id: string;
  alt: string;
  folder: string | undefined;
  updatedAt: string;
  createdAt: string;
  url: string;
  thumbnailURL: string | undefined;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  focalX: number;
  focalY: number;
}
