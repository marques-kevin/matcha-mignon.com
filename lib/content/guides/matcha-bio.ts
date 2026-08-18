import { link, text } from "../blocks";
import type { Guide } from "./types";

export const guide: Guide = {
  slug: "matcha-bio",
  title: "Matcha bio : quoi choisir ?",
  description:
    "Matcha bio ou conventionnel ? Labels, goût, prix et impact : tout ce qu'il faut savoir pour choisir votre poudre de thé vert en confiance.",
  readingTime: "5 min",
  publishedAt: "2026-08-16",
  updatedAt: "2026-08-16",
  keywords: ["matcha bio", "thé vert bio", "matcha biologique"],
  relatedGuides: ["qu-est-ce-que-le-matcha", "preparer-le-matcha"],
  relatedProducts: [],
  sections: [
    {
      heading: "Qu'est-ce que le matcha bio ?",
      content: [
        text(
          "Un matcha bio est issu d'une culture certifiée selon le règlement européen sur l'agriculture biologique (label AB en France). Concrètement, cela signifie : pas de pesticides de synthèse, pas d'engrais chimiques, et un contrôle annuel par un organisme certificateur indépendant. Le "
        ),
        link("/guide/qu-est-ce-que-le-matcha", "matcha"),
        text(
          " reste la même poudre de thé vert — feuilles ombragées, broyées à la pierre — mais les pratiques culturales respectent un cahier des charges strict."
        ),
      ],
    },
    {
      heading: "Matcha bio vs matcha conventionnel",
      content: [
        text(
          "Goût : les différences sont subtiles et dépendent surtout de l'origine et du grade, pas uniquement du label. Un bon matcha conventionnel de première récolte peut être plus délicat qu'un matcha bio de qualité moyenne. Prix : le bio coûte souvent 20 à 40 % plus cher, en raison des rendements plus faibles et des contrôles. Impact : le bio limite les résidus de pesticides et favorise la biodiversité des sols, un argument pertinent pour les consommateurs soucieux de l'environnement."
        ),
      ],
    },
    {
      heading: "Comment choisir un matcha bio de qualité",
      content: [
        text(
          "Vérifiez la présence du logo AB ou d'une certification reconnue (JAS au Japon, USDA aux États-Unis). Fiez-vous aussi aux critères visuels : vert émeraude intense, poudre fine, odeur herbacée fraîche. Pour la dégustation, un "
        ),
        link("/guide/comment-choisir-son-matcha", "matcha de cérémonie"),
        text(
          " bio de première récolte offre le meilleur équilibre. Apprenez à le préparer correctement avec notre guide "
        ),
        link("/guide/preparer-le-matcha", "comment préparer le matcha"),
        text(
          " — la température de l'eau et le fouettage influencent autant le résultat que la certification."
        ),
      ],
    },
  ],
};
