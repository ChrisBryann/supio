export interface EditorContentImage {
  url: string; // url of image (base64)
  name: string; // name of image
  is_added: boolean; // is the image newly added in the rich editor? this helps to check if we need to replace image with same name in Firebase storage
}
