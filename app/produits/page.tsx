import { ProductCard } from "@/components/ProductCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { JsonLd } from "@/components/JsonLd";
import { Grid, Page, PageHeader, Text } from "@/components/ui";
import { ObfuscatableLink } from "@/components/ObfuscatableLink";
import { products } from "@/lib/content/products";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Produits matcha",
  description:
    "Notre sélection de matcha japonais : cérémonie, culinaire et latte blend. Qualité premium, livraison en France.",
  path: "/produits",
  keywords: ["acheter matcha", "matcha bio", "matcha premium", "matcha japon"],
});

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "Produits",
      item: `${siteConfig.url}/produits`,
    },
  ],
};

export default function ProduitsPage() {
  return (
    <Page size="wide">
      <JsonLd data={breadcrumbJsonLd} />
      <Breadcrumb items={[{ label: "Produits" }]} />
      <PageHeader
        className="mt-6"
        title="Nos produits matcha"
        description="Trois grades, trois usages — sélectionnés directement auprès de producteurs japonais."
      />
      <Text variant="lead" className="mt-4 max-w-2xl">
        Besoin d&apos;aide pour choisir ? Consultez notre guide{" "}
        <ObfuscatableLink
          path="/guide/comment-choisir-son-matcha"
          variant="default"
        >
          comment choisir son matcha
        </ObfuscatableLink>
        .
      </Text>
      <Grid className="mt-10">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </Grid>
    </Page>
  );
}
