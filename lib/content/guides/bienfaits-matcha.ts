import { link, text } from "../blocks";
import type { Guide } from "./types";

export const guide: Guide = {
  slug: "bienfaits-matcha",
  title: "Matcha bienfaits : antioxydants, énergie, L-théanine",
  description:
    "Antioxydants, L-théanine, énergie durable : ce que dit la science sur le matcha et comment en profiter au quotidien.",
  readingTime: "7 min",
  publishedAt: "2026-02-01",
  updatedAt: "2026-08-18",
  keywords: [
    "matcha bienfaits",
    "bienfaits matcha",
    "antioxydants",
    "L-théanine",
    "énergie matcha",
  ],
  relatedGuides: [
    "qu-est-ce-que-le-matcha",
    "preparer-le-matcha",
    "matcha-bio",
    "cafeine-matcha",
  ],
  relatedProducts: [],
  sections: [
    {
      heading: "Riche en antioxydants",
      content: [
        text(
          "Le matcha contient des catéchines, notamment l'EGCG, aux propriétés antioxydantes reconnues. En consommant la feuille entière, l'apport est supérieur à celui d'un thé vert infusé."
        ),
      ],
    },
    {
      heading: "Énergie calme grâce à la L-théanine",
      content: [
        text(
          "La L-théanine modère l'effet de la caféine : concentration sans nervosité. C'est ce qui distingue le matcha du café pour beaucoup de consommateurs. Pour les dosages et la comparaison avec le café, lisez notre guide sur la "
        ),
        link("/guide/cafeine-matcha", "caféine du matcha"),
        text(". La méthode de préparation influence aussi le ressenti — voir "),
        link("/guide/preparer-le-matcha", "comment préparer le matcha"),
        text("."),
      ],
    },
    {
      heading: "Combien en boire ?",
      content: [
        text(
          "Une à deux tasses par jour suffisent pour la plupart des adultes. Pour la dégustation quotidienne, privilégiez un "
        ),
        link("/guide/comment-choisir-son-matcha", "matcha de cérémonie"),
        text(
          " de qualité. Évitez le matcha en fin de journée si vous êtes sensible à la caféine (environ 30–70 mg par tasse)."
        ),
      ],
    },
    {
      heading: "Et le matcha bio ?",
      content: [
        text(
          "Le label bio concerne les pratiques agricoles — absence de pesticides de synthèse, respect des sols — et non la concentration en nutriments. Un matcha bio n'est pas automatiquement plus riche en antioxydants qu'un matcha conventionnel de qualité. Pour comprendre ce que recouvre cette certification, consultez notre guide sur le "
        ),
        link("/guide/matcha-bio", "matcha bio"),
        text("."),
      ],
    },
  ],
};
