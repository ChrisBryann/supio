import type { Editor } from "@tiptap/react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Toggle } from "./toggle";
import { CornerDownLeft, ExternalLink, Link, Trash } from "lucide-react";
import { Input } from "./input";
import { useCallback, useEffect, useState } from "react";
import { sanitizeUrl } from "@/lib/tiptap-utils";
import { Button } from "./button";
type Props = {
  editor: Editor | null;
};

export default function LinkPopover({ editor }: Props) {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (!editor) return;
    // when ever a selection of text changes, update the url
    const updateLinkState = () => {
      const { href } = editor.getAttributes("link");
      setUrl(href || "");
    };
    editor.on("selectionUpdate", updateLinkState);
    return () => {
      editor.off("selectionUpdate", updateLinkState);
    };
  }, [editor, url]);

  const setLink = useCallback(() => {
    if (!url || !editor) return;

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url, target: "_blank" })
      .run();
    setUrl("");
  }, [editor, url]);
  const handleOpenLink = useCallback(() => {
    if (!url) return;

    const safeUrl = sanitizeUrl(url, window.location.href);
    if (safeUrl !== "#") {
      window.open(safeUrl, "_blank", "noopener,noreferrer");
    }
  }, [url]);

  const removeLink = useCallback(() => {
    if (!editor) return;
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .unsetLink()
      .setMeta("preventAutolink", true)
      .run();
    setUrl("");
  }, [editor]);
  if (!editor) return null;
  return (
    <Popover>
      <PopoverTrigger>
        <Toggle
          aria-label="Link"
          size="sm"
          variant={"toolbar"}
          pressed={editor.isActive("link")}
          asChild
        >
          <Link className="size-4" />
        </Toggle>
      </PopoverTrigger>
      <PopoverContent className="w-96 flex flex-row gap-2 py-2 px-4 rounded-full">
        <Input
          type="url"
          placeholder="Paste a link..."
          value={url ?? ""}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(event: React.KeyboardEvent) => {
            if (event.key === "Enter") {
              event.preventDefault();
              setLink();
            }
          }}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          className="shadow-none outline-none border-0 focus:ring-0 focus:ring-offset-0"
        />
        <div className="flex flex-row">
          <Button
            className="p-2.5"
            variant={"ghost"}
            value="enter"
            onClick={setLink}
            title="Apply Link"
            disabled={!url && !editor.isActive("link")}
          >
            <CornerDownLeft className="size-1" />
          </Button>
          <Button
            className="p-2.5"
            variant={"ghost"}
            value="external"
            onClick={handleOpenLink}
            title="Open External Link"
            disabled={!url && !editor.isActive("link")}
          >
            <ExternalLink className="size-1" />
          </Button>
          <Button
            className="p-2.5"
            variant={"ghost"}
            value="delete"
            onClick={removeLink}
            title="Delete URL"
            disabled={!url && !editor.isActive("link")}
          >
            <Trash className="size-1" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
