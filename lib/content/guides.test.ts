import { readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { generateGuidesIndex } from "../../scripts/generate-guides-index";
import {
  getAllGuideSlugs,
  getGuide,
  guides,
  type Guide,
} from "@/lib/content/guides";

const GUIDES_DIR = join(import.meta.dirname, "guides");

const SKIP_FILES = new Set(["index.ts", "types.ts"]);

function guideFilenames(): string[] {
  return readdirSync(GUIDES_DIR).filter(
    (filename) =>
      filename.endsWith(".ts") &&
      !filename.endsWith(".test.ts") &&
      !SKIP_FILES.has(filename)
  );
}

const EXPECTED_META: Record<string, Pick<Guide, "title" | "description">> = {
  "qu-est-ce-que-le-matcha": {
    title: "Qu'est-ce que le matcha ?",
    description:
      "Origines, culture japonaise et différences entre matcha cérémonie et matcha culinaire. Tout comprendre sur cette poudre de thé vert.",
  },
  "preparer-le-matcha": {
    title: "Comment préparer le matcha",
    description:
      "Méthode traditionnelle au chasen, matcha latte et erreurs courantes. Le guide complet pour une tasse parfaite.",
  },
  "recette-matcha-latte": {
    title: "Recette matcha latte maison",
    description:
      "Recette simple de matcha latte : dosages, lait végétal, mousse parfaite. Version chaude et iced, avec ou sans sucre.",
  },
  "bienfaits-matcha": {
    title: "Les bienfaits du matcha",
    description:
      "Antioxydants, L-théanine, énergie durable : ce que dit la science sur le matcha et comment en profiter au quotidien.",
  },
  "cafeine-matcha": {
    title: "Caféine du matcha : dosage et effets",
    description:
      "Combien de caféine dans une tasse de matcha ? Comparaison avec le café, libération progressive grâce à la L-théanine, et conseils de consommation.",
  },
  "matcha-bio": {
    title: "Matcha bio : quoi choisir ?",
    description:
      "Matcha bio ou conventionnel ? Labels, goût, prix et impact : tout ce qu'il faut savoir pour choisir votre poudre de thé vert en confiance.",
  },
  "comment-choisir-son-matcha": {
    title: "Comment choisir son matcha ?",
    description:
      "Couleur, grade, budget et labels : nos critères pour choisir un matcha selon votre usage — dégustation, latte ou cuisine.",
  },
  "recettes-matcha-cuisine": {
    title: "Recettes au matcha : cuisine et pâtisserie",
    description:
      "Gâteau, cookies, glace, smoothie : nos recettes faciles au matcha. Quel grade utiliser, dosages et astuces pour un goût équilibré.",
  },
  "conservation-matcha": {
    title: "Comment conserver le matcha",
    description:
      "Durée de vie après ouverture, récipient idéal, frigo ou pas : nos conseils pour stocker votre matcha et reconnaître qu'il est périmé.",
  },
};

describe("guides loader", () => {
  it("aggregates every guide file in the folder without a hand-written barrel", () => {
    const slugs = guideFilenames().map((filename) =>
      filename.replace(/\.ts$/, "")
    );

    expect(slugs.length).toBeGreaterThan(0);
    expect([...getAllGuideSlugs()].sort()).toEqual([...slugs].sort());
    expect(guides).toHaveLength(slugs.length);

    for (const slug of slugs) {
      expect(getGuide(slug)?.slug).toBe(slug);
    }
  });

  it("preserves getGuide / getAllGuideSlugs behavior", () => {
    expect(getGuide("preparer-le-matcha")?.title).toBe(
      "Comment préparer le matcha"
    );
    expect(getGuide("missing-guide")).toBeUndefined();
    expect(getAllGuideSlugs()).toEqual(guides.map((guide) => guide.slug));
  });

  it("keeps titles and descriptions unchanged", () => {
    for (const [slug, meta] of Object.entries(EXPECTED_META)) {
      const guide = getGuide(slug);
      expect(guide, slug).toBeDefined();
      expect(guide?.title).toBe(meta.title);
      expect(guide?.description).toBe(meta.description);
    }
  });

  it("sorts guides by publishedAt then slug", () => {
    const ordered = [...guides].sort(
      (a, b) =>
        a.publishedAt.localeCompare(b.publishedAt) || a.slug.localeCompare(b.slug)
    );
    expect(guides.map((guide) => guide.slug)).toEqual(
      ordered.map((guide) => guide.slug)
    );
  });

  it("regenerates an identical index (no hand edits)", () => {
    const first = generateGuidesIndex();
    const second = generateGuidesIndex();
    expect(second).toBe(first);
  });
});
