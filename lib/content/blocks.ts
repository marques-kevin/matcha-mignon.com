import type { ContentBlock } from "./types";

export function text(value: string): ContentBlock {
  return { type: "text", value };
}

export function link(href: string, label: string): ContentBlock {
  return { type: "link", href, label };
}
