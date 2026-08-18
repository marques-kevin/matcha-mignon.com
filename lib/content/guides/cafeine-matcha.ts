import { link, text } from "../blocks";
import type { Guide } from "./types";

export const guide: Guide = {
  slug: "cafeine-matcha",
  title: "Caféine du matcha : dosage et effets",
  description:
    "Combien de caféine dans une tasse de matcha ? Comparaison avec le café, libération progressive grâce à la L-théanine, et conseils de consommation.",
  readingTime: "6 min",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  keywords: [
    "caféine matcha",
    "caféine du matcha",
    "matcha vs café",
    "L-théanine",
  ],
  relatedGuides: ["bienfaits-matcha", "preparer-le-matcha"],
  relatedProducts: ["matcha-ceremonie", "matcha-latte"],
  sections: [
    {
      heading: "Combien de caféine dans une tasse de matcha ?",
      content: [
        text(
          "Une tasse de matcha (1 à 2 g de poudre pour 70 à 80 ml d'eau) contient généralement 30 à 70 mg de caféine. Trois facteurs font varier ce dosage : le grade — un "
        ),
        link("/produits/matcha-ceremonie", "matcha de cérémonie"),
        text(
          " de première récolte est souvent un peu plus riche qu'un grade culinaire —, la quantité de poudre (2 g apportent environ le double d'1 g) et la température de l'eau. Plus l'eau est chaude, plus l'extraction est rapide : restez autour de 75–80 °C, comme expliqué dans notre guide "
        ),
        link("/guide/preparer-le-matcha", "comment préparer le matcha"),
        text("."),
      ],
    },
    {
      heading: "Matcha vs café vs thé vert infusé",
      content: [
        text(
          "À titre de comparaison : une tasse de matcha (1–2 g) apporte 30 à 70 mg de caféine ; un espresso, 60 à 80 mg ; un café filtre (200 ml), 80 à 120 mg ; un thé vert infusé, 20 à 45 mg. Le matcha se situe donc entre le thé vert classique et le café. L'écart s'explique par la consommation de la feuille entière — on n'infuse pas, on avale la poudre. Un matcha de cérémonie dosé à 2 g reste plus léger qu'un café du matin, tout en étant plus stimulant qu'un sencha."
        ),
      ],
    },
    {
      heading: "L-théanine : une énergie calme, sans crash",
      content: [
        text(
          "La caféine du matcha n'agit pas comme celle du café. La L-théanine, un acide aminé naturellement présent dans le thé vert ombragé, ralentit l'absorption de la caféine et favorise une vigilance calme : pas de pic nerveux, pas de crash deux heures plus tard. C'est cette synergie qui explique l'énergie durable du matcha. Pour le détail des antioxydants et des autres effets, lisez notre guide sur les "
        ),
        link("/guide/bienfaits-matcha", "bienfaits du matcha"),
        text("."),
      ],
    },
    {
      heading: "Quand boire son matcha ?",
      content: [
        text(
          "Le meilleur moment : le matin ou en début d'après-midi, et 30 à 45 minutes avant un effort sportif ou une session de concentration. Évitez le soir si vous êtes sensible à la caféine — la L-théanine adoucit l'effet, mais 30 à 70 mg restent suffisants pour retarder l'endormissement. Pour un rituel quotidien, privilégiez un "
        ),
        link("/produits/matcha-ceremonie", "matcha de cérémonie"),
        text(" ; pour un latte plus copieux, un "),
        link("/produits/matcha-latte", "blend matcha latte"),
        text(
          ". Une à deux tasses par jour suffisent pour la plupart des adultes."
        ),
      ],
    },
  ],
};
