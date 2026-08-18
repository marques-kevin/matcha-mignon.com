export type Product = {
  slug: string;
  title: string;
  description: string;
  grade: "cérémonie" | "culinaire" | "latte";
  origin: string;
  price: string;
  image: string;
  imageAlt: string;
  keywords: string[];
  relatedGuides: string[];
  relatedProducts: string[];
  highlights: string[];
};

export const products: Product[] = [
  {
    slug: "matcha-ceremonie",
    title: "Matcha Cérémonie Uji",
    description:
      "Matcha premium de première récolte, cultivé à Uji (Kyoto). Notes umami, douceur veloutée — idéal pour la dégustation pure.",
    grade: "cérémonie",
    origin: "Uji, Kyoto, Japon",
    price: "32 €",
    image: "/products/matcha-ceremonie.webp",
    imageAlt: "Boîte de matcha cérémonie Uji, poudre jade et chashaku",
    keywords: ["matcha cérémonie", "matcha uji", "matcha premium"],
    relatedGuides: [
      "qu-est-ce-que-le-matcha",
      "preparer-le-matcha",
      "comment-choisir-son-matcha",
    ],
    relatedProducts: ["matcha-culinaire", "matcha-latte"],
    highlights: [
      "Première récolte (ichibancha)",
      "Ombragé 3 semaines",
      "Broyé à la pierre",
      "30 g — environ 30 tasses",
    ],
  },
  {
    slug: "matcha-culinaire",
    title: "Matcha Culinaire Bio",
    description:
      "Matcha robuste et économique pour la cuisine : gâteaux, glaces, smoothies. Certifié agriculture biologique.",
    grade: "culinaire",
    origin: "Kagoshima, Japon",
    price: "18 €",
    image: "/products/matcha-culinaire.webp",
    imageAlt: "Pochon de matcha culinaire bio et poudre dans un bol",
    keywords: ["matcha culinaire", "matcha bio", "matcha cuisine"],
    relatedGuides: [
      "qu-est-ce-que-le-matcha",
      "preparer-le-matcha",
      "comment-choisir-son-matcha",
      "recettes-matcha-cuisine",
    ],
    relatedProducts: ["matcha-ceremonie", "matcha-latte"],
    highlights: [
      "Certifié bio UE",
      "Goût franc, légèrement amer",
      "Excellent rapport qualité-prix",
      "100 g — usage cuisine",
    ],
  },
  {
    slug: "matcha-latte",
    title: "Matcha Latte Blend",
    description:
      "Mélange optimisé pour les lattes : mousse crémeuse, équilibre sucré-umami. Le favori des coffee shops.",
    grade: "latte",
    origin: "Nishio, Aichi, Japon",
    price: "24 €",
    image: "/products/matcha-latte.webp",
    imageAlt: "Boîte de matcha latte blend et tasse de latte mousseux",
    keywords: ["matcha latte", "matcha café", "poudre matcha latte"],
    relatedGuides: [
      "preparer-le-matcha",
      "recette-matcha-latte",
      "bienfaits-matcha",
      "comment-choisir-son-matcha",
    ],
    relatedProducts: ["matcha-ceremonie", "matcha-culinaire"],
    highlights: [
      "Mousse épaisse garantie",
      "Compatible lait végétal",
      "Sans sucre ajouté",
      "50 g — environ 25 lattes",
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}
