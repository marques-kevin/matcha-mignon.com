import { image, link, text } from "../blocks";
import type { Guide } from "./types";

export const guide: Guide = {
  slug: "preparer-le-matcha",
  title: "Comment préparer le matcha",
  description:
    "Méthode traditionnelle au chasen, matcha latte et erreurs courantes. Le guide complet pour une tasse parfaite.",
  readingTime: "5 min",
  publishedAt: "2026-01-20",
  updatedAt: "2026-08-19",
  keywords: ["préparer matcha", "chasen", "matcha latte", "recette matcha"],
  relatedGuides: [
    "qu-est-ce-que-le-matcha",
    "recette-matcha-latte",
    "conservation-matcha",
    "bienfaits-matcha",
    "accessoires-matcha",
    "ceremonie-du-the-matcha",
  ],
  relatedProducts: [],
  sections: [
    {
      heading: "La méthode traditionnelle",
      content: [
        // CC0 Wikimedia: public/guides/preparer-le-matcha/matcha-bol-chasen.attribution.txt
        image(
          "/guides/preparer-le-matcha/matcha-bol-chasen.jpg",
          "Bol de poudre de matcha vert et fouet en bambou (chasen) pour la préparation traditionnelle",
          1280,
          853,
          "Matcha dans un bol, prêt à être fouetté au chasen."
        ),
        text("Tamisez 1 à 2 g de "),
        link("/guide/comment-choisir-son-matcha", "matcha de cérémonie"),
        text(
          " dans un bol (chawan). Ajoutez 70 ml d'eau à 75–80 °C — jamais bouillante. Fouettez en M avec un "
        ),
        link("/guide/accessoires-matcha", "fouet matcha"),
        text(
          " (chasen) pendant 20 secondes jusqu'à obtenir une mousse fine. Ce geste usucha, simplifié, s'inspire de la "
        ),
        link("/guide/ceremonie-du-the-matcha", "cérémonie du thé matcha"),
        text("."),
      ],
    },
    {
      heading: "Le matcha latte maison",
      content: [
        text(
          "Préparez d'abord le matcha concentré (2 g + 30 ml d'eau chaude) avec un "
        ),
        link("/guide/recette-matcha-latte", "blend matcha latte"),
        text(
          ". Versez sur 200 ml de lait végétal chauffé (avoine ou amande). Ajoutez un filet de miel si souhaité. Pour une recette détaillée avec dosages, variantes chaudes et iced, consultez notre "
        ),
        link("/guide/recette-matcha-latte", "recette matcha latte"),
        text("."),
      ],
    },
    {
      heading: "Les erreurs à éviter",
      content: [
        text(
          "Eau trop chaude (amer), matcha non tamisé (grumeaux), conservation inadéquate (oxydation). Pour tout savoir sur le stockage — récipient, frigo, durée de vie — consultez notre guide "
        ),
        link("/guide/conservation-matcha", "conservation du matcha"),
        text(
          ". Pour en savoir plus sur les différences de qualité, lisez "
        ),
        link("/guide/qu-est-ce-que-le-matcha", "qu'est-ce que le matcha"),
        text("."),
      ],
    },
  ],
};
