import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ContentBlocks } from "./ContentBlocks";
import { image, link, text } from "@/lib/content/blocks";

describe("ContentBlocks", () => {
  it("wraps text and links in a paragraph and renders images as sibling figures", () => {
    const html = renderToStaticMarkup(
      <ContentBlocks
        blocks={[
          text("Hello "),
          link("/guide", "world"),
          image(
            "/guides/preparer-le-matcha/matcha-bol-chasen.jpg",
            "Bol de matcha et chasen",
            1280,
            853,
            "Légende du bol"
          ),
          text("Après l'image."),
        ]}
      />
    );

    expect(html).toContain("<p>");
    expect(html).toContain("<figure>");
    expect(html).toContain("<figcaption>Légende du bol</figcaption>");
    expect(html).toContain('alt="Bol de matcha et chasen"');
    expect(html).toContain('width="1280"');
    expect(html).toContain('height="853"');
    expect(html).toContain('loading="lazy"');
    expect(html).toContain('decoding="async"');
    expect(html).toContain('src="/guides/preparer-le-matcha/matcha-bol-chasen.jpg"');
    expect(html).not.toMatch(/<p>[^<]*<img/);
    expect(html).not.toContain("<p><figure");
    expect(html).toMatch(/<\/p><figure/);
    expect(html).toMatch(/<\/figure><p>/);
  });

  it("omits figcaption when there is no caption", () => {
    const html = renderToStaticMarkup(
      <ContentBlocks
        blocks={[image("/guides/foo/bar.jpg", "Bar", 400, 300)]}
      />
    );

    expect(html).toContain("<figure>");
    expect(html).not.toContain("<figcaption>");
  });
});
