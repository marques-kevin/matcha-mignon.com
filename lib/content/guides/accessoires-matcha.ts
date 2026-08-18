import { image, link, text } from "../blocks";
import type { Guide } from "./types";

export const guide: Guide = {
  slug: "accessoires-matcha",
  title: "Fouet matcha (chasen) : lequel choisir",
  description:
    "Fouet bambou (chasen), entretien, tailles et alternatives. Guide d'achat des accessoires matcha pour débuter.",
  readingTime: "6 min",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-19",
  keywords: ["fouet matcha", "chasen", "accessoires matcha"],
  relatedGuides: ["preparer-le-matcha", "comment-choisir-son-matcha"],
  relatedProducts: [],
  sections: [
    {
      heading: "Quel fouet matcha (chasen) choisir ?",
      content: [
        // CC BY-SA 4.0 Wikimedia: public/guides/accessoires-matcha/fouets-chasen-bambou.attribution.txt
        image(
          "/guides/accessoires-matcha/fouets-chasen-bambou.jpg",
          "Fouets matcha en bambou (chasen) alignés, accessoires de cérémonie du thé",
          1280,
          956,
          "Le chasen, fouet matcha en bambou : l'accessoire central du rituel."
        ),
        text(
          "Le fouet matcha, ou chasen, est un fouet en bambou dont les dents aèrent la poudre dans l'eau. Le chiffre indiqué — 80, 100 ou 120 — correspond au nombre de dents : 80 dents pour le koicha (thé épais, geste plus lent), 100 dents pour un usage polyvalent au quotidien, 120 dents pour l'usucha (thé léger) et une mousse plus fine. Pour débuter, un chasen 100 dents en bambou blanc suffit largement. Vérifiez que les dents sont souples, régulières, et que le manche n'est pas fendu. Un fouet trop rigide ou trop lâche ne montera pas la mousse."
        ),
      ],
    },
    {
      heading: "Entretien et durée de vie du chasen",
      content: [
        text(
          "Rincez le fouet matcha à l'eau tiède après chaque usage — jamais de savon, jamais de lave-vaisselle : le bambou se fend et prend les odeurs. Secouez-le, puis séchez-le dents vers le haut, idéalement sur un kusenaoshi (support en céramique) pour conserver la forme en dôme. Un chasen utilisé tous les jours dure en général 3 à 6 mois ; en usage occasionnel, 1 à 2 ans. Remplacez-le lorsque les dents se fendent, se recroquevillent ou perdent leur ressort : un fouet fatigué laisse des grumeaux et une mousse plate."
        ),
      ],
    },
    {
      heading: "Comment utiliser un fouet matcha",
      content: [
        text(
          "Tamisez 1 à 2 g de matcha, versez 70 ml d'eau à 75–80 °C, puis fouettez en M (ou en W) pendant 15 à 20 secondes, poignet souple, sans écraser les dents au fond du bol. L'objectif : une mousse fine, serrée, sans grosses bulles. Le geste se travaille : commencez vite pour décoller la poudre, terminez plus lentement pour lisser. Le pas à pas complet — dosages, température, erreurs — est dans notre guide "
        ),
        link("/guide/preparer-le-matcha", "comment préparer le matcha"),
        text("."),
      ],
    },
    {
      heading: "Fouet électrique et mousseur : les alternatives",
      content: [
        text(
          "Un mini-fouet électrique ou un mousseur à lait dissout le matcha plus vite, surtout dans un latte : pratique le matin, mais la mousse est plus grossière et le rituel disparaît. Un shaker (ou un bocal à vis) convient en déplacement. Ces alternatives évitent d'investir dans un chasen — elles ne remplacent toutefois pas le fouet bambou pour une tasse usucha. Si vous hésitez : chasen pour la dégustation, mousseur pour les lattes du quotidien. Aucun de ces outils ne rattrape une poudre de mauvaise qualité : voyez d'abord "
        ),
        link(
          "/guide/comment-choisir-son-matcha",
          "comment choisir son matcha"
        ),
        text("."),
      ],
    },
    {
      heading: "Kit débutant : bol, cuillère et tamis",
      content: [
        text(
          "Autour du fouet, trois accessoires matcha suffisent pour bien commencer. Le bol (chawan) doit être assez large pour fouetter sans éclabousser — un bol à céréales large fait l'affaire au début. La cuillère en bambou (chashaku) dose environ 1 g par cuillerée rase ; une cuillère à café rase s'en rapproche. Un petit tamis (passoire fine) évite les grumeaux, surtout avec un matcha un peu compacté. Inutile d'acheter un coffret premium : fouet 100 dents, bol large, tamis de cuisine. Le geste, lui, s'apprend dans la "
        ),
        link("/guide/preparer-le-matcha", "préparation du matcha"),
        text("."),
      ],
    },
  ],
};
