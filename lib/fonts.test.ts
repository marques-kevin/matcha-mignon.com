import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync("lib/fonts.ts", "utf8");
const layout = readFileSync("app/layout.tsx", "utf8");

describe("brand fonts", () => {
  it("loads Figtree and Shippori Mincho via next/font/google with swap", () => {
    expect(source).toContain('from "next/font/google"');
    expect(source).toContain("Figtree");
    expect(source).toContain("Shippori_Mincho");
    expect(source).toContain('subsets: ["latin", "latin-ext"]');
    expect(source).toContain('display: "swap"');
    expect(source).toContain('variable: "--font-figtree"');
    expect(source).toContain('variable: "--font-shippori-mincho"');
  });

  it("covers the logo 抹 glyph with a local Mincho subset", () => {
    expect(source).toContain("next/font/local");
    expect(source).toContain("shippori-mincho-mark.woff2");
    expect(source).toContain("U+62B9");
    expect(source).toContain('variable: "--font-shippori-mincho-mark"');
  });

  it("applies font CSS variables on the root html element", () => {
    expect(layout).toContain("fontVariables");
    expect(layout).toContain("<html lang=\"fr\" className={fontVariables}>");
  });
});
