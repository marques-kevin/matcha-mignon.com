import { GuideCard } from "@/components/GuideCard";
import { ProductCard } from "@/components/ProductCard";
import { JsonLd } from "@/components/JsonLd";
import {
  Button,
  Container,
  Grid,
  Section,
  SectionHeader,
  Text,
  Title,
} from "@/components/ui";
import { guides } from "@/lib/content/guides";
import { products } from "@/lib/content/products";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: "/",
  keywords: ["matcha", "thé vert japonais", "matcha france", "guide matcha"],
});

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: "fr-FR",
};

export default function Home() {
  return (
    <>
      <JsonLd data={websiteJsonLd} />

      <Section variant="hero">
        <Container size="narrow" className="text-center">
          <Text variant="eyebrow">Thé vert japonais</Text>
          <Title as="h1" variant="hero" className="mt-4">
            Découvrez le matcha
          </Title>
          <Text variant="lead" className="mt-6">
            {siteConfig.description}
          </Text>
          <div className="mt-8 flex justify-center gap-4">
            <Button href="/guide" variant="primary">
              Lire les guides
            </Button>
            <Button href="/produits" variant="secondary">
              Voir les produits
            </Button>
          </div>
        </Container>
      </Section>

      <Section variant="content">
        <Container>
          <SectionHeader
            title="Guides"
            description="Tout savoir sur le matcha, de la culture à la tasse."
            href="/guide"
            linkLabel="Tous les guides →"
          />
          <Grid className="mt-8">
            {guides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </Grid>
        </Container>
      </Section>

      <Section variant="contentLast">
        <Container>
          <SectionHeader
            title="Nos produits"
            description="Matcha sélectionné directement au Japon."
            href="/produits"
            linkLabel="Tous les produits →"
          />
          <Grid className="mt-8">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </Grid>
        </Container>
      </Section>
    </>
  );
}
