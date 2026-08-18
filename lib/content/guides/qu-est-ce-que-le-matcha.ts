import { image, link, text } from "../blocks";
import type { Guide } from "./types";

export const guide: Guide = {
  slug: "qu-est-ce-que-le-matcha",
  title: "Qu'est-ce que le matcha ?",
  description:
    "Origines, culture japonaise et différences entre matcha cérémonie et matcha culinaire. Tout comprendre sur cette poudre de thé vert.",
  readingTime: "6 min",
  publishedAt: "2026-01-15",
  updatedAt: "2026-08-19",
  keywords: [
    "matcha",
    "thé vert japonais",
    "matcha cérémonie",
    "origine matcha",
  ],
  relatedGuides: [
    "preparer-le-matcha",
    "conservation-matcha",
    "bienfaits-matcha",
    "matcha-bio",
    "comment-choisir-son-matcha",
    "recettes-matcha-cuisine",
    "cafeine-matcha",
  ],
  relatedProducts: [],
  sections: [
    {
      heading: "Une poudre de thé vert millénaire",
      content: [
        // CC0 Wikimedia: public/guides/qu-est-ce-que-le-matcha/bol-poudre-matcha.attribution.txt
        image(
          "/guides/qu-est-ce-que-le-matcha/bol-poudre-matcha.jpg",
          "Bol de poudre de matcha vert, thé matcha fouetté, feuille de thé et fouet chasen",
          1280,
          854,
          "Poudre de matcha, tasse préparée et chasen : le thé vert japonais en un regard."
        ),
        text(
          "Le matcha est une poudre fine obtenue à partir de feuilles de théier ombragées, broyées à la pierre. Contrairement au thé infusé, on consomme la feuille entière, ce qui concentre les nutriments et la caféine — voir notre guide sur la "
        ),
        link("/guide/cafeine-matcha", "caféine du matcha"),
        text("."),
      ],
    },
    {
      heading: "Cérémonie ou cuisine ?",
      content: [
        text("Le "),
        link("/guide/comment-choisir-son-matcha", "matcha de cérémonie"),
        text(
          " (ceremonial grade) est récolté au printemps, plus doux et umami. Le "
        ),
        link("/guide/recettes-matcha-cuisine", "matcha culinaire"),
        text(
          " (culinary grade) est plus robuste, idéal pour les lattes, smoothies et pâtisseries. Pour des idées concrètes en cuisine, consultez nos "
        ),
        link(
          "/guide/recettes-matcha-cuisine",
          "recettes au matcha"
        ),
        text("."),
      ],
    },
    {
      heading: "Comment reconnaître un bon matcha",
      content: [
        text(
          "Couleur vert émeraude vif, odeur herbacée fraîche, texture fine sans grains. Un matcha jaunâtre ou amer indique souvent une qualité inférieure ou une mauvaise conservation — voir notre guide sur la "
        ),
        link("/guide/conservation-matcha", "conservation du matcha"),
        text(". Pour la dégustation, consultez notre guide "),
        link("/guide/preparer-le-matcha", "comment préparer le matcha"),
        text(". Pour un conseil d'achat complet, consultez notre guide "),
        link(
          "/guide/comment-choisir-son-matcha",
          "comment choisir son matcha"
        ),
        text("."),
      ],
    },
    {
      heading: "Matcha bio : une alternative responsable",
      content: [
        text(
          "Le label bio garantit une culture sans pesticides de synthèse et un cahier des charges strict. Cela ne remplace pas les critères de qualité gustative — couleur, finesse, origine — mais rassure sur les pratiques agricoles. Pour tout comprendre sur la certification et les différences avec le matcha conventionnel, lisez notre guide "
        ),
        link("/guide/matcha-bio", "matcha bio"),
        text("."),
      ],
    },
  ],
};
