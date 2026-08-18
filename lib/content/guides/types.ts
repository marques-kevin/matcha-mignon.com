import type { ContentSection, ImageBlock } from "../types";

/**
 * Cover image for OG / Twitter / Article JSON-LD.
 * Same shape as an `image()` block, without the discriminant.
 */
export type GuideCover = Omit<ImageBlock, "type">;

/**
 * One article per file in this folder: `lib/content/guides/<slug>.ts`
 * must `export const guide: Guide`. `index.ts` is generated — do not edit it.
 */
export type Guide = {
  slug: string;
  title: string;
  description: string;
  readingTime: string;
  publishedAt: string;
  updatedAt: string;
  keywords: string[];
  relatedGuides: string[];
  relatedProducts: string[];
  cover: GuideCover;
  sections: ContentSection[];
};
