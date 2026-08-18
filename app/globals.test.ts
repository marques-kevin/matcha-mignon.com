import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync("app/globals.css", "utf8");

describe("globals.css design tokens", () => {
  it("keeps the matcha ramp and cream primitive", () => {
    expect(css).toContain("--color-cream:");
    expect(css).toContain("--color-matcha-50:");
    expect(css).toContain("--color-matcha-900:");
  });

  it("defines semantic role tokens", () => {
    for (const token of [
      "--color-canvas",
      "--color-surface",
      "--color-subtle",
      "--color-fg",
      "--color-fg-muted",
      "--color-brand",
      "--color-brand-hover",
      "--color-on-brand",
      "--color-inverse",
      "--color-inverse-border",
      "--color-on-inverse",
      "--color-on-inverse-muted",
      "--color-border",
      "--color-focus",
      "--radius-card",
      "--radius-pill",
    ]) {
      expect(css).toContain(`${token}:`);
    }
  });

  it("sets a visible keyboard focus ring", () => {
    expect(css).toMatch(/:focus-visible\s*\{[^}]*outline:\s*2px solid/);
    expect(css).toContain("prefers-reduced-motion");
  });
});
