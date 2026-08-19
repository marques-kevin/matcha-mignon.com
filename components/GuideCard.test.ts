import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const card = readFileSync("components/GuideCard.tsx", "utf8");
const header = readFileSync("components/ui/section-header.tsx", "utf8");

describe("GuideCard", () => {
  it("renders the guide cover like ProductCard, with alt and intrinsic size", () => {
    expect(card).toContain('from "next/image"');
    expect(card).toContain("guide.cover.src");
    expect(card).toContain("guide.cover.alt");
    expect(card).toContain("guide.cover.width");
    expect(card).toContain("guide.cover.height");
    expect(card).toContain("object-cover");
    expect(card).toContain("aspect-[3/2]");
    expect(card).toContain("overflow-hidden");
  });
});

describe("SectionHeader", () => {
  it("stacks title and link below sm so they do not collide at 390px", () => {
    expect(header).toContain("flex-col");
    expect(header).toContain("sm:flex-row");
    expect(header).toContain("sm:items-end");
    expect(header).toContain("sm:justify-between");
    expect(header).not.toMatch(
      /className=\{cn\("flex items-end justify-between/,
    );
  });
});
