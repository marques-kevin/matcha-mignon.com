import { describe, expect, it } from "vitest";
import { generateMetadata } from "./page";
import { getAllGuideSlugs, getGuide } from "@/lib/content/guides";

describe("guide generateMetadata", () => {
  it("always sets OG and Twitter images from guide.cover", async () => {
    for (const slug of getAllGuideSlugs()) {
      const guide = getGuide(slug);
      expect(guide, slug).toBeDefined();
      if (!guide) continue;

      const metadata = await generateMetadata({
        params: Promise.resolve({ slug }),
      });

      expect(metadata.openGraph?.images).toEqual([
        {
          url: guide.cover.src,
          alt: guide.cover.alt,
          width: guide.cover.width,
          height: guide.cover.height,
        },
      ]);
      expect(metadata.twitter?.images).toEqual([guide.cover.src]);
    }
  });
});
