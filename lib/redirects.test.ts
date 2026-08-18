import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const EXPECTED_REDIRECTS = [
  "/produits /guide/comment-choisir-son-matcha 301",
  "/produits/matcha-ceremonie /guide/comment-choisir-son-matcha 301",
  "/produits/matcha-culinaire /guide/recettes-matcha-cuisine 301",
  "/produits/matcha-latte /guide/recette-matcha-latte 301",
];

describe("Cloudflare Pages product redirects", () => {
  it("ships 301 rules for retired /produits routes", () => {
    const source = readFileSync("public/_redirects", "utf8");

    for (const rule of EXPECTED_REDIRECTS) {
      expect(source).toContain(rule);
    }
  });
});
