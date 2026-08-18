import { link, text } from "../blocks";
import type { Guide } from "./types";

export const guide: Guide = {
  slug: "conservation-matcha",
  title: "Comment conserver le matcha",
  description:
    "Durée de vie après ouverture, récipient idéal, frigo ou pas : nos conseils pour stocker votre matcha et reconnaître qu'il est périmé.",
  readingTime: "4 min",
  publishedAt: "2026-08-16",
  updatedAt: "2026-08-16",
  keywords: [
    "conservation matcha",
    "conserver matcha",
    "matcha périmé",
    "stockage matcha",
  ],
  relatedGuides: ["preparer-le-matcha", "qu-est-ce-que-le-matcha"],
  relatedProducts: [],
  sections: [
    {
      heading: "Durée de vie après ouverture",
      content: [
        text(
          "Un matcha de qualité conserve ses arômes pendant 3 à 4 semaines après ouverture, si le sachet est refermé rapidement et stocké correctement. Avant ouverture, la date limite indiquée par le producteur peut aller jusqu'à 12 à 18 mois — mais la poudre perd progressivement sa fraîcheur dès la fabrication. Pour tirer le meilleur parti d'un sachet frais, consultez notre guide sur "
        ),
        link("/guide/preparer-le-matcha", "comment préparer le matcha"),
        text("."),
      ],
    },
    {
      heading: "Les ennemis du matcha",
      content: [
        text(
          "Quatre facteurs accélèrent l'oxydation : la lumière (qui décolore la poudre), l'air (qui la sèche), la chaleur (qui dégrade les arômes) et l'humidité (qui peut provoquer des grumeaux). Le matcha est particulièrement sensible car la feuille est broyée : la surface exposée à l'oxygène est maximale. Rangez-le dans un endroit frais (15–20 °C), sombre et sec."
        ),
      ],
    },
    {
      heading: "Le récipient idéal",
      content: [
        text(
          "Optez pour un récipient opaque et hermétique — boîte métallique ou pot en verre foncé avec joint. Transférez le matcha du sachet d'origine dès l'ouverture pour limiter l'air résiduel. Évitez les contenants en plastique transparent ou les boîtes trop grandes : moins d'air dans le récipient, moins d'oxydation. Un "
        ),
        link("/guide/comment-choisir-son-matcha", "matcha de cérémonie"),
        text(
          " de première récolte, plus fin et fragile, exige une conservation stricte pour garder son vert émeraude."
        ),
      ],
    },
    {
      heading: "Frigo ou pas ?",
      content: [
        text(
          "Le réfrigérateur prolonge la durée de vie si le récipient est parfaitement étanche — mais attention aux risques : condensation à l'ouverture, absorption d'odeurs alimentaires et variations de température. Pour la plupart des consommateurs, un placard frais et sombre suffit. Le frigo n'est utile que si vous stockez un sachet non ouvert longtemps ou un matcha rare en grande quantité."
        ),
      ],
    },
    {
      heading: "Signes qu'un matcha est périmé",
      content: [
        text(
          "Couleur jaunâtre ou olive terne, odeur fade ou rance, goût amer sans umami ni douceur — ces signes indiquent une oxydation avancée. La poudre peut aussi former des grumeaux irréductibles. Un matcha périmé n'est pas dangereux, mais il perd ses bienfaits gustatifs et nutritionnels. Pour comprendre ce qui fait la qualité d'un matcha frais, lisez "
        ),
        link("/guide/qu-est-ce-que-le-matcha", "qu'est-ce que le matcha"),
        text("."),
      ],
    },
  ],
};
