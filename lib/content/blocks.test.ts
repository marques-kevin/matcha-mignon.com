import { describe, expect, it } from "vitest";
import { findFirstImage, image, link, text } from "./blocks";

describe("image()", () => {
  it("builds an image block with required alt, width and height", () => {
    expect(
      image("/guides/preparer-le-matcha/matcha-bol-chasen.jpg", "Bol de matcha", 1280, 853)
    ).toEqual({
      type: "image",
      src: "/guides/preparer-le-matcha/matcha-bol-chasen.jpg",
      alt: "Bol de matcha",
      width: 1280,
      height: 853,
    });
  });

  it("includes an optional caption", () => {
    expect(
      image("/guides/foo/bar.jpg", "Bar", 400, 300, "Légende")
    ).toMatchObject({ caption: "Légende" });
  });

  it("rejects an empty alt", () => {
    expect(() => image("/guides/foo/bar.jpg", "   ", 400, 300)).toThrow(
      /non-empty alt/
    );
  });
});

describe("findFirstImage()", () => {
  it("returns the first image block across sections", () => {
    const first = image("/guides/a/one.jpg", "One", 100, 80);
    const second = image("/guides/a/two.jpg", "Two", 100, 80);

    expect(
      findFirstImage([
        { heading: "Intro", content: [text("Hello "), link("/guide", "lien")] },
        { heading: "Suite", content: [text("Avant"), first, second] },
      ])
    ).toBe(first);
  });

  it("returns undefined when a guide has no image", () => {
    expect(
      findFirstImage([{ heading: "Intro", content: [text("Hello")] }])
    ).toBeUndefined();
  });
});
