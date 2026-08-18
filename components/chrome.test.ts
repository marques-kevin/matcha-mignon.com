import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const rampColor =
  /(?:bg|text|from|to|border)-matcha-\d+|text-white|bg-white|bg-cream|rounded-full\b/;

const files = {
  logo: "components/ui/logo.tsx",
  header: "components/Header.tsx",
  footer: "components/Footer.tsx",
  footerLinks: "components/FooterLinks.tsx",
  navLinks: "components/NavLinks.tsx",
  mobileNav: "components/MobileNav.tsx",
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
    expect(source).toContain("MobileNav");
    expect(source).toContain("bg-canvas/80");
    expect(source).toContain("border-border/60");
    expect(source).toContain("obfuscated");
    expect(source).not.toContain("\"use client\"");
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

  it("desktop nav stays inline from md and keeps obfuscation", () => {
    const source = readFileSync(files.navLinks, "utf8");
    expect(source).toContain("hidden md:block");
    expect(source).toContain("flex items-center gap-6");
    expect(source).toContain("obfuscated");
    expect(source).toContain('variant="nav"');
    expect(source).toContain("/guide");
    expect(source).toContain("/a-propos");
    expect(source).not.toContain("/produits");
  });

  it("mobile nav is a disclosure with semantic tokens", () => {
    const source = readFileSync(files.mobileNav, "utf8");
    expect(source).toContain("md:hidden");
    expect(source).toContain("aria-expanded");
    expect(source).toContain("aria-controls");
    expect(source).toContain("aria-label");
    expect(source).toContain('Escape');
    expect(source).toContain("Ouvrir le menu");
    expect(source).toContain("Fermer le menu");
    expect(source).toContain("rounded-pill");
    expect(source).toContain("text-fg");
    expect(source).toContain("hover:bg-brand-subtle");
    expect(source).toContain("bg-canvas/95");
    expect(source).toContain("border-border/60");
    expect(source).toContain("motion-safe-transition");
    expect(source).toContain("obfuscated");
    expect(source).toContain("hidden={!open}");
  });
});
