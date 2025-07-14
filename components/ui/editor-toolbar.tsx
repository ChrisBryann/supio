import type { Editor } from "@tiptap/react";
import { Toggle } from "./toggle";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  List,
  ListOrdered,
  MinusSquare,
  Quote,
  Strikethrough,
} from "lucide-react";
import React from "react";
import LinkPopover from "./link-popover";
import ImageUploadButton from "./image-upload-button";

interface ToolbarProps {
  editor: Editor | null;
}

export default function EditorToolbar({ editor }: ToolbarProps) {
  if (!editor) return null;

  return (
    <div className="bg-gray-200 rounded-t-md p-2 flex flex-row flex-wrap gap-2">
      {/* HEADINGS */}
      <Toggle
        size="sm"
        variant={"toolbar"}
        pressed={editor.isActive("heading", { level: 1 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <Heading1 className="size-4" />
      </Toggle>
      <Toggle
        size="sm"
        variant={"toolbar"}
        pressed={editor.isActive("heading", { level: 2 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className="size-4" />
      </Toggle>
      <Toggle
        size="sm"
        variant={"toolbar"}
        pressed={editor.isActive("heading", { level: 3 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
      >
        <Heading3 className="size-4" />
      </Toggle>
      {/* BOLD */}
      <Toggle
        size="sm"
        variant={"toolbar"}
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="size-4" />
      </Toggle>
      {/* ITALIC */}
      <Toggle
        size="sm"
        variant={"toolbar"}
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="size-4" />
      </Toggle>
      {/* STRIKETHROUGH */}
      <Toggle
        size="sm"
        variant={"toolbar"}
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="size-4" />
      </Toggle>
      {/* ORDERED LIST */}
      <Toggle
        size="sm"
        variant={"toolbar"}
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="size-4" />
      </Toggle>
      {/* BULLET LIST */}
      <Toggle
        size="sm"
        variant={"toolbar"}
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="size-4" />
      </Toggle>
      {/* CODE BLOCK */}
      <Toggle
        size="sm"
        variant={"toolbar"}
        pressed={editor.isActive("codeBlock")}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <Code className="size-4" />
      </Toggle>
      {/* BLOCKQUOTE */}
      <Toggle
        size="sm"
        variant={"toolbar"}
        pressed={editor.isActive("blockquote")}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="size-4" />
      </Toggle>
      {/* HORIZONTAL RULE */}
      <Toggle
        aria-label="Horizontal Rule"
        size="sm"
        variant={"toolbar"}
        pressed={false}
        onPressedChange={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <MinusSquare className="size-4" />
      </Toggle>
      {/* LINK */}
      <LinkPopover editor={editor} />
      {/* IMAGE UPLOAD */}
      <ImageUploadButton editor={editor} />
    </div>
  );
}
