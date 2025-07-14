import type { Editor } from "@tiptap/react";
import { Toggle } from "./toggle";
import { ImagePlus } from "lucide-react";
import { useCallback } from "react";

type Props = {
  editor: Editor | null;
};
export default function ImageUploadButton({ editor }: Props) {
  const handleInsertImage = useCallback(() => {
    if (!editor) return false;
    return editor
      .chain()
      .focus()
      .insertContent({
        type: "imageUpload",
      })
      .run();
  }, [editor]);
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!e.defaultPrevented) {
        handleInsertImage();
      }
    },
    [handleInsertImage]
  );
  if (!editor) return null;
  return (
    <Toggle
      aria-label="Image Upload"
      size="sm"
      variant={"toolbar"}
      title="Upload image"
      pressed={editor.isActive("imageUpload")}
      onClick={handleClick}
    >
      <ImagePlus className="size-4" />
    </Toggle>
  );
}
