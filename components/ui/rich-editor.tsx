import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import UniqueID from "@tiptap/extension-unique-id";
import EditorToolbar from "./editor-toolbar";
import RichEditorSkeleton from "../skeletons/rich-editor-skeleton";
import { ImageUploadNode } from "../tiptap-node/image-upload-node";
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";
import { useCallback } from "react";

interface EditorProps {
  content: string;
  onChange: (text: string) => void;
  handleUploadImageNode: (name: string, url: string) => void;
  handleDeleteImageNode: (url: string) => void;
  isLoadingContentImages: boolean;
}

export default function RichEditor({
  content,
  onChange,
  handleUploadImageNode,
  handleDeleteImageNode,
  isLoadingContentImages,
}: EditorProps) {
  const uploadImage = useCallback(
    async (
      file: File,
      onProgress?: (event: { progress: number }) => void,
      abortSignal?: AbortSignal
    ): Promise<string> => {
      const url = await handleImageUpload(file, onProgress, abortSignal);
      handleUploadImageNode(file.name, url);
      return url;
    },
    [handleUploadImageNode]
  );

  const editor = useEditor({
    content,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write something...",
        emptyNodeClass:
          "first:before:h-0 first:before:text-gray-400 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none",
      }),
      Link.configure({
        defaultProtocol: "https",
        protocols: ["http", "https"],
        openOnClick: "whenNotEditable",
      }).extend({
        inclusive: false,
      }),
      Image.configure({
        inline: false,
      }),
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: uploadImage,
        onError: (error) => console.log("Upload failed:", error),
      }),
      UniqueID.configure({
        attributeName: "uid",
        types: ["image"],
      }),
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[200px] w-full border border-input rounded-md bg-background px-3 py-2 text-base border-0 outline-0 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    onUpdate: ({ transaction, editor }) => {
      // get all current image tag nodes from current transaction
      const imageSrcs = new Set<string>();
      transaction.doc.content.forEach((node) => {
        if (node.type.name === "image") {
          imageSrcs.add(node.attrs.uid);
        }
      });
      // now check with the previous transaction to see any nodes that were deleted
      transaction.before.content.forEach((node) => {
        if (node.type.name === "image" && !imageSrcs.has(node.attrs.uid)) {
          handleDeleteImageNode(node.attrs.src);
        }
      });
      onChange(editor.getHTML());
    },
  });
  if (isLoadingContentImages || !editor) return <RichEditorSkeleton />;
  return (
    <div className="border border-gray-400 divide-y divide-gray-400 rounded-md prose prose-sm sm:prose-base lg:prose-lg prose-ol:list-decimal prose-ul:list-disc">
      <EditorToolbar editor={editor} />
      <div className="rounded-b-md h-72 overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
