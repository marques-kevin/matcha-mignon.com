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
    relatedGuides: ["preparer-le-matcha", "bienfaits-matcha", "matcha-bio"],
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
      {
        heading: "Matcha bio : une alternative responsable",
        content: [
          text(
            "Le label bio garantit une culture sans pesticides de synthèse et un cahier des charges strict. Cela ne remplace pas les critères de qualité gustative — couleur, finesse, origine — mais rassure sur les pratiques agricoles. Pour tout comprendre sur la certification et les différences avec le matcha conventionnel, lisez notre guide "
          ),
          link("/guide/matcha-bio", "matcha bio"),
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
    relatedGuides: ["qu-est-ce-que-le-matcha", "preparer-le-matcha", "matcha-bio"],
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
  },
  {
    slug: "matcha-bio",
    title: "Matcha bio : quoi choisir ?",
    description:
      "Matcha bio ou conventionnel ? Labels, goût, prix et impact : tout ce qu'il faut savoir pour choisir votre poudre de thé vert en confiance.",
    readingTime: "5 min",
    publishedAt: "2026-08-16",
    updatedAt: "2026-08-16",
    keywords: ["matcha bio", "thé vert bio", "matcha biologique"],
    relatedGuides: ["qu-est-ce-que-le-matcha", "preparer-le-matcha"],
    relatedProducts: ["matcha-ceremonie"],
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
          link("/produits/matcha-ceremonie", "matcha de cérémonie"),
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
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return guides.map((g) => g.slug);
}
