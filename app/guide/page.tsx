import { GuideCard } from "@/components/GuideCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { JsonLd } from "@/components/JsonLd";
import { Grid, Page, PageHeader } from "@/components/ui";
import { guides } from "@/lib/content/guides";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Guides matcha",
  description:
    "Guides complets sur le matcha : origines, préparation, bienfaits et conseils pour choisir votre poudre de thé vert.",
  path: "/guide",
  keywords: ["guide matcha", "apprendre matcha", "thé vert japonais"],
});

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "Guides",
      item: `${siteConfig.url}/guide`,
    },
  ],
};

export default function GuidesPage() {
  return (
    <Page size="wide">
      <JsonLd data={breadcrumbJsonLd} />
      <Breadcrumb items={[{ label: "Guides" }]} />
      <PageHeader
        className="mt-6"
        title="Guides matcha"
        description="Des articles pour tout comprendre sur le matcha — de la feuille à la tasse."
      />
      <Grid className="mt-10">
        {guides.map((guide) => (
          <GuideCard key={guide.slug} guide={guide} />
        ))}
      </Grid>
    </Page>
  );
}
