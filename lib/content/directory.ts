import { guides } from "./guides";
import { products } from "./products";

export type DirectorySection = {
  title: string;
  href: string;
  description?: string;
  items: { href: string; label: string; description?: string }[];
};

export const directorySections: DirectorySection[] = [
  {
    title: "Guides",
    href: "/guide",
    description: "Tout savoir sur le matcha, de la culture à la tasse.",
    items: guides.map((guide) => ({
      href: `/guide/${guide.slug}`,
      label: guide.title,
      description: guide.description,
    })),
  },
  {
    title: "Produits",
    href: "/produits",
    description: "Notre sélection de matcha japonais.",
    items: products.map((product) => ({
      href: `/produits/${product.slug}`,
      label: product.title,
      description: product.description,
    })),
  },
  {
    title: "Le site",
    href: "/annuaire",
    items: [
      { href: "/", label: "Accueil" },
      { href: "/a-propos", label: "À propos" },
      { href: "/annuaire", label: "Annuaire" },
    ],
  },
];
