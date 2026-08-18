import { describe, expect, it } from "vitest";
import { getAllGuideSlugs } from "@/lib/content/guides";
import {
  getAllProductSlugs,
  getProduct,
  products,
} from "@/lib/content/products";

const KEBAB_CASE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

describe("public products API", () => {
  it("returns unique, kebab-case, non-empty slugs", () => {
    const slugs = getAllProductSlugs();

    expect(slugs.length).toBeGreaterThan(0);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(getAllProductSlugs()).toEqual(
      products.map((product) => product.slug)
    );

    for (const slug of slugs) {
      expect(slug.length).toBeGreaterThan(0);
      expect(slug).toMatch(KEBAB_CASE);
    }
  });

  it("finds each slug and returns undefined for an unknown slug", () => {
    for (const slug of getAllProductSlugs()) {
      expect(getProduct(slug)?.slug).toBe(slug);
    }

    expect(getProduct("slug-inconnu")).toBeUndefined();
  });

  it("points relatedGuides and relatedProducts at existing slugs", () => {
    const guideSlugs = new Set(getAllGuideSlugs());
    const productSlugs = new Set(getAllProductSlugs());

    for (const product of products) {
      for (const related of product.relatedGuides) {
        expect(guideSlugs.has(related), `${product.slug} → ${related}`).toBe(
          true
        );
      }

      for (const related of product.relatedProducts) {
        expect(productSlugs.has(related), `${product.slug} → ${related}`).toBe(
          true
        );
      }
    }
  });
});
