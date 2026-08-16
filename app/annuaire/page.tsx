import { Breadcrumb } from "@/components/Breadcrumb";
import { JsonLd } from "@/components/JsonLd";
import {
  Card,
  Page,
  PageHeader,
  SectionHeader,
  Stack,
  Text,
  TextLink,
} from "@/components/ui";
import { directorySections } from "@/lib/content/directory";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Annuaire",
  description:
    `Annuaire complet de ${siteConfig.name} : tous les guides, produits et pages du site pour explorer le thé vert japonais.`,
  path: "/annuaire",
  keywords: [
    "annuaire matcha",
    "plan du site",
    "guides matcha",
    "produits matcha",
  ],
});

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "Annuaire",
      item: `${siteConfig.url}/annuaire`,
    },
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `Annuaire — ${siteConfig.name}`,
  description: `Liste de toutes les pages du site ${siteConfig.name}`,
  numberOfItems: directorySections.reduce(
    (sum, section) => sum + section.items.length,
    0
  ),
  itemListElement: directorySections.flatMap((section, sectionIndex) =>
    section.items.map((item, itemIndex) => ({
      "@type": "ListItem",
      position: sectionIndex * 10 + itemIndex + 1,
      name: item.label,
      url: `${siteConfig.url}${item.href === "/" ? "" : item.href}`,
    }))
  ),
};

export default function DirectoryPage() {
  return (
    <Page>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />
      <Breadcrumb items={[{ label: "Annuaire" }]} />
      <PageHeader
        className="mt-6"
        title="Annuaire du site"
        description={`Toutes les pages de ${siteConfig.name} — guides, produits et ressources pour explorer le matcha.`}
      />

      <Stack gap="lg" className="mt-10">
        {directorySections.map((section) => (
          <section key={section.title}>
            <SectionHeader
              title={section.title}
              description={section.description}
              href={section.href}
            />
            <Stack gap="md" className="mt-4">
              {section.items.map((item) => (
                <Card key={item.href} as="div" variant="list">
                  <TextLink href={item.href}>{item.label}</TextLink>
                  {item.description && (
                    <Text variant="small" className="mt-1">
                      {item.description}
                    </Text>
                  )}
                </Card>
              ))}
            </Stack>
          </section>
        ))}
      </Stack>
    </Page>
  );
}
