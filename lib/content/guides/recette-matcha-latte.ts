import { image, link, text } from "../blocks";
import type { Guide } from "./types";

export const guide: Guide = {
  slug: "recette-matcha-latte",
  title: "Recette matcha latte maison",
  description:
    "Recette simple de matcha latte : dosages, lait végétal, mousse parfaite. Version chaude et iced, avec ou sans sucre.",
  readingTime: "6 min",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-19",
  keywords: [
    "recette matcha latte",
    "matcha latte maison",
    "matcha latte",
    "latte matcha",
  ],
  relatedGuides: [
    "preparer-le-matcha",
    "comment-choisir-son-matcha",
    "bienfaits-matcha",
  ],
  relatedProducts: [],
  // CC BY-SA 4.0 Wikimedia: public/guides/recette-matcha-latte/matcha-latte-tasse.attribution.txt
  cover: image(
    "/guides/recette-matcha-latte/matcha-latte-tasse.jpg",
    "Recette matcha latte en tasse noire avec latte art sur une table en bois",
    1280,
    720,
    "Matcha latte maison : mousse fine et vert émeraude."
  ),
  sections: [
    {
      heading: "Ingrédients et dosages",
      content: [
        text(
          "Pour un matcha latte classique, prévoyez 2 g de matcha (environ 1 cuillère à café rase), 30 ml d'eau chaude (75–80 °C), 200 ml de lait végétal ou entier et un sucrant optionnel (miel, sirop d'érable ou sucre de coco). Un "
        ),
        link("/guide/recette-matcha-latte", "blend matcha latte"),
        text(
          " est formulé pour ce ratio : mousse épaisse et équilibre sucré-umami sans ajout de sucre. Tamisez toujours le matcha avant utilisation pour éviter les grumeaux."
        ),
      ],
    },
    {
      heading: "Recette chaude pas à pas",
      content: [
        text(
          "1. Tamisez 2 g de matcha dans un bol ou un shaker. 2. Ajoutez 30 ml d'eau à 75–80 °C et fouettez en M avec un chasen pendant 15 secondes, ou secouez vigoureusement dans un shaker 30 secondes. 3. Chauffez 200 ml de lait (sans le faire bouillir) — avoine pour la crème, amande pour la légèreté, lait entier pour plus de richesse. 4. Versez le matcha concentré dans une tasse, ajoutez le lait chaud et mélangez. 5. Sucrez à votre goût. Pour les bases de préparation, consultez aussi notre guide "
        ),
        link("/guide/preparer-le-matcha", "comment préparer le matcha"),
        text("."),
      ],
    },
    {
      heading: "Version iced (matcha latte glacé)",
      content: [
        text(
          "Préparez le matcha concentré comme pour la version chaude, mais avec 30 ml d'eau tiède (pas bouillante). Remplissez un grand verre de glaçons, versez le matcha, puis ajoutez 200 ml de lait froid — avoine ou amande fonctionnent très bien. Secouez ou remuez avant de boire. L'iced latte est idéal en été et met en valeur la couleur vert émeraude du matcha."
        ),
      ],
    },
    {
      heading: "Astuces pour une mousse parfaite",
      content: [
        text(
          "La température de l'eau est cruciale : au-delà de 80 °C, le matcha devient amer. Un fouet en bambou (chasen) crée une mousse fine et aérée ; un shaker ou un fouet électrique donne une mousse plus épaisse, idéale pour les lattes. Préparez le matcha concentré avant le lait : la poudre se dissout mieux dans une petite quantité d'eau chaude. Pour choisir le bon matcha selon votre usage, lisez notre guide "
        ),
        link(
          "/guide/comment-choisir-son-matcha",
          "comment choisir son matcha"
        ),
        text("."),
      ],
    },
    {
      heading: "Erreurs courantes à éviter",
      content: [
        text(
          "Grumeaux : le matcha non tamisé ou mal fouetté laisse des amas dans la tasse — tamisez systématiquement et fouettez vigoureusement. Matcha amer : eau trop chaude ou surdosage — respectez 2 g pour 30 ml d'eau et ne dépassez pas 80 °C. Mousse qui retombe : lait trop froid ou matcha trop dilué — concentrez d'abord le matcha, puis incorporez le lait. Pour les bienfaits nutritionnels du matcha au quotidien, consultez notre guide sur les "
        ),
        link("/guide/bienfaits-matcha", "bienfaits du matcha"),
        text("."),
      ],
    },
  ],
};
