import { describe, expect, it } from "vitest";
import { buildMetadata } from "./seo";
import { siteConfig } from "./site";

function isAbsoluteHttpUrl(value: unknown): value is string {
  return typeof value === "string" && /^https?:\/\//.test(value);
}

describe("buildMetadata", () => {
  it("uses an absolute title with name and tagline on the home page", () => {
    const metadata = buildMetadata({
      title: "unused on home",
      description: siteConfig.description,
      path: "/",
    });

    expect(metadata.title).toEqual({
      absolute: `${siteConfig.name} — ${siteConfig.tagline}`,
    });
    expect(metadata.alternates?.canonical).toBe(siteConfig.url);
  });

  it("uses the page title and site url plus path on internal pages", () => {
    const path = "/guide/preparer-le-matcha";
    const title = "Comment préparer le matcha";
    const metadata = buildMetadata({
      title,
      description: "Méthode traditionnelle au chasen.",
      path,
    });

    expect(metadata.title).toBe(title);
    expect(metadata.alternates?.canonical).toBe(`${siteConfig.url}${path}`);
  });

  it("always sets an absolute canonical URL", () => {
    const pages = [
      buildMetadata({
        title: siteConfig.name,
        description: siteConfig.description,
        path: "/",
      }),
      buildMetadata({
        title: "Guides matcha",
        description: "Guides complets sur le matcha.",
        path: "/guide",
      }),
    ];

    for (const metadata of pages) {
      expect(isAbsoluteHttpUrl(metadata.alternates?.canonical)).toBe(true);
    }
  });
});
