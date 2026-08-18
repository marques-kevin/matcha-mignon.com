import { link, text } from "../blocks";
import type { Guide } from "./types";

export const guide: Guide = {
  slug: "comment-choisir-son-matcha",
  title: "Comment choisir son matcha ?",
  description:
    "Couleur, grade, budget et labels : nos critères pour choisir un matcha selon votre usage — dégustation, latte ou cuisine.",
  readingTime: "6 min",
  publishedAt: "2026-08-16",
  updatedAt: "2026-08-16",
  keywords: [
    "choisir matcha",
    "quel matcha acheter",
    "matcha qualité",
    "grade matcha",
  ],
  relatedGuides: [
    "qu-est-ce-que-le-matcha",
    "preparer-le-matcha",
    "matcha-bio",
    "recettes-matcha-cuisine",
  ],
  relatedProducts: [
    "matcha-ceremonie",
    "matcha-culinaire",
    "matcha-latte",
  ],
  sections: [
    {
      heading: "Les critères de qualité à vérifier",
      content: [
        text(
          "Avant le prix ou le packaging, trois signaux visuels et gustatifs orientent un bon choix. La couleur doit être vert émeraude intense — un matcha jaunâtre ou brun indique souvent une qualité inférieure ou une oxydation. L'origine compte : Uji, Nishio et Kagoshima produisent des matcha reconnus, mais un bon terroir ne remplace pas un grade adapté à votre usage. Enfin, le grade (cérémonie, culinaire, latte) détermine le profil gustatif et le prix. Pour les bases, commencez par comprendre "
        ),
        link("/guide/qu-est-ce-que-le-matcha", "qu'est-ce que le matcha"),
        text("."),
      ],
    },
    {
      heading: "Quel budget selon votre usage",
      content: [
        text(
          "Pour la dégustation pure en bol traditionnel, investissez dans un matcha de cérémonie de première récolte — comptez 25 à 40 € pour 30 g. Pour les lattes quotidiens, un "
        ),
        link("/produits/matcha-latte", "blend matcha latte"),
        text(
          " offre un meilleur rapport qualité-prix (environ 20 à 30 € pour 50 g). Pour la cuisine — gâteaux, glaces, smoothies — le "
        ),
        link("/produits/matcha-culinaire", "matcha culinaire"),
        text(
          " est le choix économique (15 à 25 € pour 100 g). N'achetez pas du matcha de cérémonie pour la pâtisserie : vous diluez un produit premium sans en tirer les nuances. Pour des recettes pas à pas — gâteau, cookies, glace — consultez notre guide "
        ),
        link(
          "/guide/recettes-matcha-cuisine",
          "recettes au matcha"
        ),
        text(". Apprenez la préparation adaptée dans notre guide "),
        link("/guide/preparer-le-matcha", "comment préparer le matcha"),
        text("."),
      ],
    },
    {
      heading: "Labels et certifications : ce qu'ils garantissent",
      content: [
        text(
          "Le label bio (AB en France) certifie l'absence de pesticides de synthèse et un cahier des charges agricole strict — utile pour la cuisine et les lattes quotidiens. L'origine Japon n'est pas une certification officielle, mais un indicateur de tradition et de savoir-faire ; vérifiez toujours la région précise (Uji, Nishio, Kagoshima). Aucun label ne remplace vos propres critères visuels : couleur, finesse de la poudre, odeur herbacée fraîche. Pour le bio en détail, lisez notre guide "
        ),
        link("/guide/matcha-bio", "matcha bio"),
        text(
          ". Méfiez-vous des promesses marketing (« superfood », « détox ») : un bon matcha se juge à la tasse, pas au packaging."
        ),
      ],
    },
    {
      heading: "Comparer les trois grades de matcha",
      content: [
        text(
          "Cérémonie : première récolte, doux et umami, idéal pour la dégustation pure — voir notre "
        ),
        link("/produits/matcha-ceremonie", "matcha de cérémonie Uji"),
        text(
          ". Culinaire : plus robuste et amer, parfait pour la cuisine et les smoothies — voir le "
        ),
        link("/produits/matcha-culinaire", "matcha culinaire bio"),
        text(
          ". Latte : mélange optimisé pour une mousse crémeuse avec du lait — voir le "
        ),
        link("/produits/matcha-latte", "matcha latte blend"),
        text(
          ". En résumé : cérémonie pour la pureté, culinaire pour l'économie en cuisine, latte pour le café quotidien. Choisissez selon votre rituel, pas selon un classement externe."
        ),
      ],
    },
  ],
};
