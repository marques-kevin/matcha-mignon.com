export const siteConfig = {
  name: "Matcha Matcha",
  tagline: "Le guide du thé vert japonais en France",
  description:
    "Découvrez le matcha : guides, bienfaits, préparation et sélection des meilleures poudres de thé vert japonais.",
  url: "https://matcha-matcha.fr",
  locale: "fr_FR",
  author: "Matcha Matcha",
} as const;

export type BreadcrumbItem = {
  label: string;
  href?: string;
};
