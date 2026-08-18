import { link, text } from "../blocks";
import type { Guide } from "./types";

export const guide: Guide = {
  slug: "recettes-matcha-cuisine",
  title: "Recettes au matcha : cuisine et pâtisserie",
  description:
    "Gâteau, cookies, glace, smoothie : nos recettes faciles au matcha. Quel grade utiliser, dosages et astuces pour un goût équilibré.",
  readingTime: "8 min",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  keywords: [
    "recette matcha",
    "gâteau matcha",
    "pâtisserie matcha",
    "matcha cuisine",
    "cookies matcha",
  ],
  relatedGuides: [
    "qu-est-ce-que-le-matcha",
    "preparer-le-matcha",
    "comment-choisir-son-matcha",
    "conservation-matcha",
  ],
  relatedProducts: ["matcha-culinaire"],
  sections: [
    {
      heading: "Pourquoi du matcha culinaire en cuisine ?",
      content: [
        text(
          "En pâtisserie et en cuisine salée, le matcha doit tenir face aux autres ingrédients — beurre, sucre, lait, farine — sans disparaître ni devenir trop amer. Le "
        ),
        link("/produits/matcha-culinaire", "matcha culinaire"),
        text(
          " est conçu pour cela : profil plus robuste, prix plus doux par portion que le matcha de cérémonie. Réserver le "
        ),
        link("/produits/matcha-ceremonie", "matcha de cérémonie"),
        text(
          " à la dégustation pure : ses notes umami fines se perdent dans un gâteau ou un smoothie. Pour comprendre la différence entre les grades, lisez "
        ),
        link("/guide/qu-est-ce-que-le-matcha", "qu'est-ce que le matcha"),
        text(" et notre guide "),
        link(
          "/guide/comment-choisir-son-matcha",
          "comment choisir son matcha"
        ),
        text("."),
      ],
    },
    {
      heading: "Dosages type : combien de matcha par portion ?",
      content: [
        text(
          "Une cuillère à café rase correspond à environ 2 g de matcha. Pour un smoothie ou un latte glacé : 2 g (1 c. à café) pour 250 ml de liquide. Cookies : 4 à 6 g pour 12 biscuits. Gâteau marbré : 8 à 10 g pour un cake de 6 parts. Glace maison : 5 à 8 g pour 500 ml de base crème. Commencez toujours par la dose minimale : le matcha s'intensifie en cuisson et au froid. Pour la boisson chaude traditionnelle, consultez "
        ),
        link("/guide/preparer-le-matcha", "comment préparer le matcha"),
        text("."),
      ],
    },
    {
      heading: "Smoothie matcha-banane",
      content: [
        text(
          "Tamisez 2 g de matcha culinaire dans un bol. Ajoutez 1 banane, 200 ml de lait d'amande froid et 1 c. à soupe de yaourt. Mixez 30 secondes jusqu'à une texture lisse. Le froid limite l'amertume ; ajoutez du miel si besoin. Idéal pour tester un nouveau sachet de "
        ),
        link("/produits/matcha-culinaire", "matcha culinaire"),
        text(" sans matériel de cérémonie."),
      ],
    },
    {
      heading: "Cookies matcha-chocolat",
      content: [
        text(
          "Mélangez 120 g de beurre mou, 80 g de sucre et 5 g de matcha tamisé. Incorporez 1 œuf, puis 180 g de farine et 80 g de pépites de chocolat. Formez des boules, enfournez 12 minutes à 170 °C. Le matcha colore la pâte d'un vert pastel ; ne prolongez pas la cuisson : une cookie trop dorée masque les arômes herbacés."
        ),
      ],
    },
    {
      heading: "Gâteau marbré au matcha",
      content: [
        text(
          "Préparez une base vanille classique (2 œufs, 100 g de sucre, 100 g de farine, 80 g de beurre). Divisez la pâte : tamisez 8 g de matcha dans une moitié avec 2 c. à soupe de lait. Versez les deux masses en alternance dans un moule, puis marbrez avec une fourchette. Cuisez 35 minutes à 165 °C. Un "
        ),
        link("/produits/matcha-culinaire", "matcha culinaire bio"),
        text(
          " offre un contraste visuel net entre le vert matcha et la vanille."
        ),
      ],
    },
    {
      heading: "Glace matcha maison",
      content: [
        text(
          "Fouettez 6 g de matcha tamisé dans 50 ml de lait chaud (pas bouillant) jusqu'à dissolution complète. Mélangez avec 250 ml de crème liquide, 80 g de sucre et 1 c. à soupe de miel. Réfrigérez 2 heures, puis turbinez ou placez au congélateur en remuant toutes les 30 minutes. La glace concentre le goût : réduisez le sucre si vous aimez un profil plus vert."
        ),
      ],
    },
    {
      heading: "Latte glacé matcha",
      content: [
        text(
          "Tamisez 2 g de matcha dans 30 ml d'eau tiède (75 °C), fouettez jusqu'à mousse. Versez sur 200 ml de lait froid et des glaçons. Variante café : ajoutez un expresso pour un dirty matcha latte. Pour la version chaude et crémeuse, suivez notre guide "
        ),
        link("/guide/preparer-le-matcha", "comment préparer le matcha"),
        text("."),
      ],
    },
    {
      heading: "Astuces pour un goût équilibré",
      content: [
        text(
          "Tamisez toujours le matcha avant incorporation : zéro grumeau, couleur homogène. Évitez la surchauffe : au-delà de 80 °C, les arômes deviennent amers — préférez l'eau tiède ou le froid en pâtisserie. Pour les préparations réfrigérées (glace, crème), le matcha s'intensifie après 24 h : dosez en conséquence. Conservez les pâtisseries au matcha dans une boîte hermétique 2 à 3 jours ; le vert s'oxydise vite à l'air. Pour le sachet d'origine, appliquez nos conseils de "
        ),
        link("/guide/conservation-matcha", "conservation du matcha"),
        text("."),
      ],
    },
    {
      heading: "Tableau récapitulatif : grade et usage",
      content: [
        text(
          "Cérémonie (1–2 g) : dégustation pure en bol, sans sucre ni lait — profil umami et doux. Culinaire (2–10 g) : smoothies, cookies, gâteaux, glaces, lattes — goût franc, bon rapport qualité-prix. Latte (2 g) : lattes quotidiens avec lait végétal, mousse optimisée. En cuisine, le culinaire est le choix par défaut ; le cérémonie ne se justifie que pour une finition décorative (saupoudrage léger sur un entremets)."
        ),
      ],
    },
  ],
};
