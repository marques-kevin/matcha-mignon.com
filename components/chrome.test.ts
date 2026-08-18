import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const rampColor =
  /(?:bg|text|from|to|border)-matcha-\d+|text-white|bg-white|bg-cream|rounded-full\b/;

const files = {
  logo: "components/ui/logo.tsx",
  header: "components/Header.tsx",
  footer: "components/Footer.tsx",
  footerLinks: "components/FooterLinks.tsx",
};

describe("header, footer, and logo chrome", () => {
  it.each(Object.entries(files))(
    "%s uses semantic tokens instead of the matcha ramp",
    (_name, path) => {
      expect(readFileSync(path, "utf8")).not.toMatch(rampColor);
    },
  );

  it("header composes Container, Logo, and the existing nav", () => {
    const source = readFileSync(files.header, "utf8");
    expect(source).toContain("Container");
    expect(source).toContain("<Logo");
    expect(source).toContain("NavLinks");
    expect(source).toContain("bg-canvas/80");
    expect(source).toContain("border-border/60");
    expect(source).toContain("obfuscated");
  });

  it("footer uses inverse tokens and Container", () => {
    const source = readFileSync(files.footer, "utf8");
    expect(source).toContain("bg-inverse");
    expect(source).toContain("text-on-inverse");
    expect(source).toContain("Container");
    expect(source).toContain("tone=\"inverse\"");
    expect(source).toContain("/annuaire");
    expect(source).toContain("obfuscated");
  });

  it("logo mark uses brand-hover and on-brand", () => {
    const source = readFileSync(files.logo, "utf8");
    expect(source).toContain("bg-brand-hover");
    expect(source).toContain("text-on-brand");
    expect(source).toContain("rounded-pill");
    expect(source).toContain("抹");
  });
});
