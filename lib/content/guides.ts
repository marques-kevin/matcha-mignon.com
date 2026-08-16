import { link, text } from "./blocks";
import type { ContentSection } from "./types";

export type Guide = {
  slug: string;
  title: string;
  description: string;
  readingTime: string;
  publishedAt: string;
  updatedAt: string;
  keywords: string[];
  relatedGuides: string[];
  relatedProducts: string[];
  sections: ContentSection[];
};

export const guides: Guide[] = [
  {
    slug: "qu-est-ce-que-le-matcha",
    title: "Qu'est-ce que le matcha ?",
    description:
      "Origines, culture japonaise et différences entre matcha cérémonie et matcha culinaire. Tout comprendre sur cette poudre de thé vert.",
    readingTime: "6 min",
    publishedAt: "2026-01-15",
    updatedAt: "2026-08-16",
    keywords: [
      "matcha",
      "thé vert japonais",
      "matcha cérémonie",
      "origine matcha",
    ],
    relatedGuides: ["preparer-le-matcha", "bienfaits-matcha"],
    relatedProducts: ["matcha-ceremonie", "matcha-culinaire"],
    sections: [
      {
        heading: "Une poudre de thé vert millénaire",
        content: [
          text(
            "Le matcha est une poudre fine obtenue à partir de feuilles de théier ombragées, broyées à la pierre. Contrairement au thé infusé, on consomme la feuille entière, ce qui concentre les nutriments et la caféine."
          ),
        ],
      },
      {
        heading: "Cérémonie ou cuisine ?",
        content: [
          text("Le "),
          link("/produits/matcha-ceremonie", "matcha de cérémonie"),
          text(
            " (ceremonial grade) est récolté au printemps, plus doux et umami. Le "
          ),
          link("/produits/matcha-culinaire", "matcha culinaire"),
          text(
            " (culinary grade) est plus robuste, idéal pour les lattes, smoothies et pâtisseries."
          ),
        ],
      },
      {
        heading: "Comment reconnaître un bon matcha",
        content: [
          text(
            "Couleur vert émeraude vif, odeur herbacée fraîche, texture fine sans grains. Un matcha jaunâtre ou amer indique souvent une qualité inférieure ou une mauvaise conservation. Pour la dégustation, consultez notre guide "
          ),
          link("/guide/preparer-le-matcha", "comment préparer le matcha"),
          text("."),
        ],
      },
    ],
  },
  {
    slug: "preparer-le-matcha",
    title: "Comment préparer le matcha",
    description:
      "Méthode traditionnelle au chasen, matcha latte et erreurs courantes. Le guide complet pour une tasse parfaite.",
    readingTime: "5 min",
    publishedAt: "2026-01-20",
    updatedAt: "2026-08-16",
    keywords: ["préparer matcha", "chasen", "matcha latte", "recette matcha"],
    relatedGuides: ["qu-est-ce-que-le-matcha", "bienfaits-matcha"],
    relatedProducts: ["matcha-ceremonie", "matcha-latte"],
    sections: [
      {
        heading: "La méthode traditionnelle",
        content: [
          text("Tamisez 1 à 2 g de "),
          link("/produits/matcha-ceremonie", "matcha de cérémonie"),
          text(
            " dans un bol (chawan). Ajoutez 70 ml d'eau à 75–80 °C — jamais bouillante. Fouettez en M avec un chasen pendant 20 secondes jusqu'à obtenir une mousse fine."
          ),
        ],
      },
      {
        heading: "Le matcha latte maison",
        content: [
          text(
            "Préparez d'abord le matcha concentré (2 g + 30 ml d'eau chaude) avec un "
          ),
          link("/produits/matcha-latte", "blend matcha latte"),
          text(
            ". Versez sur 200 ml de lait végétal chauffé (avoine ou amande). Ajoutez un filet de miel si souhaité."
          ),
        ],
      },
      {
        heading: "Les erreurs à éviter",
        content: [
          text(
            "Eau trop chaude (amer), matcha non tamisé (grumeaux), conservation au frigo ouvert (oxydation). Conservez votre matcha dans un récipient hermétique, à l'abri de la lumière. Pour en savoir plus sur les différences de qualité, lisez "
          ),
          link("/guide/qu-est-ce-que-le-matcha", "qu'est-ce que le matcha"),
          text("."),
        ],
      },
    ],
  },
  {
    slug: "bienfaits-matcha",
    title: "Les bienfaits du matcha",
    description:
      "Antioxydants, L-théanine, énergie durable : ce que dit la science sur le matcha et comment en profiter au quotidien.",
    readingTime: "7 min",
    publishedAt: "2026-02-01",
    updatedAt: "2026-08-16",
    keywords: [
      "bienfaits matcha",
      "antioxydants",
      "L-théanine",
      "énergie matcha",
    ],
    relatedGuides: ["qu-est-ce-que-le-matcha", "preparer-le-matcha"],
    relatedProducts: ["matcha-ceremonie", "matcha-latte"],
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
            "La L-théanine modère l'effet de la caféine : concentration sans nervosité. C'est ce qui distingue le matcha du café pour beaucoup de consommateurs. La méthode de préparation influence aussi le ressenti — voir "
          ),
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
          link("/produits/matcha-ceremonie", "matcha de cérémonie"),
          text(
            " de qualité. Évitez le matcha en fin de journée si vous êtes sensible à la caféine (environ 30–70 mg par tasse)."
          ),
        ],
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return guides.map((g) => g.slug);
}
