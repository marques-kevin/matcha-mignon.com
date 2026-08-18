import { describe, expect, it } from "vitest";
import {
  badgeVariants,
  buttonVariants,
  cardVariants,
  linkVariants,
  sectionVariants,
  textVariants,
  titleVariants,
} from "./variants";

const rampColor = /(?:bg|text|from|to|border)-matcha-\d+|text-white|bg-white|bg-cream|rounded-full|rounded-2xl|rounded-xl\b/;

function flatten(variants: Record<string, string>) {
  return Object.values(variants).join(" ");
}

describe("semantic UI variants", () => {
  const maps = {
    title: titleVariants,
    text: textVariants,
    button: buttonVariants,
    link: linkVariants,
    section: sectionVariants,
    card: cardVariants,
    badge: badgeVariants,
  };

  it.each(Object.entries(maps))(
    "%s variants use semantic tokens instead of the matcha ramp",
    (_name, variants) => {
      expect(flatten(variants)).not.toMatch(rampColor);
    },
  );

  it("primary button maps to brand / on-brand", () => {
    expect(buttonVariants.primary).toContain("bg-brand");
    expect(buttonVariants.primary).toContain("text-on-brand");
    expect(buttonVariants.primary).toContain("rounded-pill");
    expect(buttonVariants.primary).toContain("hover:bg-brand-hover");
  });

  it("default card maps to surface / border / radius-card", () => {
    expect(cardVariants.default).toContain("bg-surface");
    expect(cardVariants.default).toContain("border-border");
    expect(cardVariants.default).toContain("rounded-card");
    expect(cardVariants.default).toContain("hover:border-border-strong");
  });

  it("hero section maps to canvas / brand-subtle", () => {
    expect(sectionVariants.hero).toContain("from-brand-subtle/50");
    expect(sectionVariants.hero).toContain("to-canvas");
  });

  it("interactive variants honor reduced motion", () => {
    expect(buttonVariants.primary).toContain("motion-safe-transition");
    expect(linkVariants.default).toContain("motion-safe-transition");
    expect(cardVariants.default).toContain("motion-safe-transition");
  });
});
