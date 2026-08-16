export type ContentBlock =
  | { type: "text"; value: string }
  | { type: "link"; href: string; label: string };

export type ContentSection = {
  heading: string;
  content: ContentBlock[];
};
