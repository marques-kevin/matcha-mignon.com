export const siteConfig = {
  name: "Matcha Mignon",
  tagline: "Le guide du thé vert japonais en France",
  description:
    "Découvrez le matcha : guides, bienfaits, préparation et sélection des meilleures poudres de thé vert japonais.",
  url: "https://matcha-mignon.com",
  locale: "fr_FR",
  author: "Matcha Mignon",
} as const;

export type BreadcrumbItem = {
  label: string;
  href?: string;
};
