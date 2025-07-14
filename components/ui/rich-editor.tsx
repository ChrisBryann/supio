import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import EditorToolbar from "./editor-toolbar";
import RichEditorSkeleton from "../skeletons/rich-editor-skeleton";
import { ImageUploadNode } from "../tiptap-node/image-upload-node";
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";

interface EditorProps {
  content: string;
  onChange(text: string): void;
}

export default function RichEditor({ content, onChange }: EditorProps) {
  const editor = useEditor({
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
        inline: true,
      }),
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.log("Upload failed:", error),
      }),
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[200px] w-full border border-input rounded-md bg-background px-3 py-2 text-base border-0 outline-0 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    onUpdate: ({ editor }) => {
      console.log("trest", editor.getHTML());
      onChange(editor.getHTML());
    },
  });
  if (!editor) return <RichEditorSkeleton />;
  return (
    <div className="border border-gray-400 divide-y divide-gray-400 rounded-md prose prose-sm sm:prose-base lg:prose-lg prose-ol:list-decimal prose-ul:list-disc">
      <EditorToolbar editor={editor} />
      <div className="rounded-b-md h-72 overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
