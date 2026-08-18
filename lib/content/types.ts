export type ImageBlock = {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
};

export type ContentBlock =
  | { type: "text"; value: string }
  | { type: "link"; href: string; label: string }
  | ImageBlock;

export type ContentSection = {
  heading: string;
  content: ContentBlock[];
};
