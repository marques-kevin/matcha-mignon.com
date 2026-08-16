import { Breadcrumb } from "@/components/Breadcrumb";
import { JsonLd } from "@/components/JsonLd";
import { Page, PageHeader, Prose, TextLink } from "@/components/ui";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "À propos",
  description:
    "Matcha Matcha : notre mission est de rendre le thé vert japonais accessible en France avec des guides fiables et des produits de qualité.",
  path: "/a-propos",
  keywords: ["matcha matcha", "à propos", "thé vert japonais france"],
});

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "À propos",
      item: `${siteConfig.url}/a-propos`,
    },
  ],
};

export default function AboutPage() {
  return (
    <Page>
      <JsonLd data={breadcrumbJsonLd} />
      <Breadcrumb items={[{ label: "À propos" }]} />
      <PageHeader className="mt-6" title={`À propos de ${siteConfig.name}`} />

      <Prose className="mt-8">
        <p>
          {siteConfig.name} est né d&apos;une passion pour le thé vert japonais.
          Face à la multiplication des produits de qualité variable sur le
          marché français, nous avons voulu créer une ressource fiable : des
          guides clairs, des produits sélectionnés et une approche transparente.
        </p>
        <h2>Notre mission</h2>
        <p>
          Rendre le matcha accessible à tous — du débutant curieux au
          connaisseur exigeant. Chaque guide est rédigé avec soin, chaque
          produit est goûté et validé avant d&apos;être recommandé.
        </p>
        <h2>Explorez le site</h2>
        <p>
          Consultez l&apos;
          <TextLink href="/annuaire">annuaire complet</TextLink> pour voir
          toutes les pages, commencez par nos{" "}
          <TextLink href="/guide">guides</TextLink> pour comprendre le matcha,
          puis découvrez notre{" "}
          <TextLink href="/produits">sélection de produits</TextLink>.
        </p>
      </Prose>
    </Page>
  );
}
