import {
  JSXConverter,
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as RichTextConverter,
} from "@payloadcms/richtext-lexical/react";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import type {
  SerializedHeadingNode,
  SerializedLinkNode,
  SerializedListNode,
  SerializedUploadNode,
} from "@payloadcms/richtext-lexical";
import Image from "next/image";

type Props = {
  richContent: SerializedEditorState;
} & React.HTMLAttributes<HTMLDivElement>;

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { relationTo, value } = linkNode.fields.doc!;
  if (typeof value !== "object") {
    throw new Error(
      "RichText.InternalDocToHref: Expected value to be an object"
    );
  }
  const slug = value.slug;

  switch (relationTo) {
    case "products":
      return `/products/${slug}`;
    case "events":
      return `/events/${slug}`;
    default:
      return `/${relationTo}/${slug}`;
  }
};

const headingConverter: JSXConverter<SerializedHeadingNode> = ({
  node,
  nodesToJSX,
}) => {
  const text = nodesToJSX({ nodes: node.children });
  const Tag = node.tag;
  let fontSize = "text-xl";
  switch (node.tag) {
    case "h1":
      fontSize = "text-5xl";
      break;
    case "h2":
      fontSize = "text-4xl";
      break;
    case "h3":
      fontSize = "text-3xl";
      break;
    case "h4":
      fontSize = "text-2xl";
      break;
    default:
      break;
  }

  return <Tag className={fontSize}>{text}</Tag>;
};

const listConverter: JSXConverter<SerializedListNode> = ({
  node,
  nodesToJSX,
}) => {
  const list = nodesToJSX({ nodes: node.children });
  const Tag = node.tag;
  return (
    <Tag className={`list-${node.tag === "ol" ? "decimal" : "disc"}`}>
      {list}
    </Tag>
  );
};

const uploadConverter: JSXConverter<SerializedUploadNode> = ({ node }) => {
  if (node.relationTo === "media") {
    const uploadDoc = node.value;
    if (typeof uploadDoc !== "object") {
      return null;
    }

    const { url, alt, id } = uploadDoc;

    return (
      <Image
        key={id}
        src={url}
        alt={alt}
        width={0}
        height={0}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="mx-auto w-full md:w-3/4"
      />
    );
  }
};

const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  // heading: headingConverter,
  // list: listConverter,
  upload: uploadConverter,
});
export default function RichText({ richContent, className, ...rest }: Props) {
  return (
    <RichTextConverter
      converters={jsxConverters}
      {...rest}
      data={richContent}
      className={`${className ?? ""} w-full prose prose-sm sm:prose-base md:prose-md prose-ol:list-decimal prose-ul:list-disc`}
    />
  );
}
