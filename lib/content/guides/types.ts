import type { ContentSection } from "../types";

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
  sections: ContentSection[];
};
