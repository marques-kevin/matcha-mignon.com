import type {
  ContentBlock,
  ContentSection,
  ImageBlock,
} from "./types";

export function text(value: string): ContentBlock {
  return { type: "text", value };
}

export function link(href: string, label: string): ContentBlock {
  return { type: "link", href, label };
}

export function image(
  src: string,
  alt: string,
  width: number,
  height: number,
  caption?: string
): ImageBlock {
  if (!alt.trim()) {
    throw new Error("image() requires a non-empty alt attribute");
  }

  return {
    type: "image",
    src,
    alt,
    width,
    height,
    ...(caption ? { caption } : {}),
  };
}

export function isImageBlock(block: ContentBlock): block is ImageBlock {
  return block.type === "image";
}

export function findFirstImage(
  sections: ContentSection[]
): ImageBlock | undefined {
  for (const section of sections) {
    const match = section.content.find(isImageBlock);
    if (match) return match;
  }
}
