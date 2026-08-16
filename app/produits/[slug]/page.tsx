import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { JsonLd } from "@/components/JsonLd";
import { RelatedLinks } from "@/components/RelatedLinks";
import {
  Badge,
  Grid,
  List,
  ListItem,
  Page,
  PageHeader,
  Text,
  Title,
} from "@/components/ui";
import { guides } from "@/lib/content/guides";
import {
  getAllProductSlugs,
  getProduct,
  products,
} from "@/lib/content/products";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return buildMetadata({
    title: product.title,
    description: product.description,
    path: `/produits/${product.slug}`,
    keywords: product.keywords,
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const relatedGuideLinks = product.relatedGuides
    .map((s) => {
      const g = guides.find((x) => x.slug === s);
      return g ? { href: `/guide/${g.slug}`, label: g.title } : null;
    })
    .filter(Boolean) as { href: string; label: string }[];

  const relatedProductLinks = product.relatedProducts
    .map((s) => {
      const p = products.find((x) => x.slug === s);
      return p ? { href: `/produits/${p.slug}`, label: p.title } : null;
    })
    .filter(Boolean) as { href: string; label: string }[];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: {
      "@type": "Offer",
      price: product.price.replace(" €", ""),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Produits",
        item: `${siteConfig.url}/produits`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.title,
        item: `${siteConfig.url}/produits/${product.slug}`,
      },
    ],
  };

  return (
    <Page>
      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <Breadcrumb
        items={[
          { label: "Produits", href: "/produits" },
          { label: product.title },
        ]}
      />
      <article>
        <header className="mt-6">
          <Badge>
            {product.grade.charAt(0).toUpperCase() + product.grade.slice(1)}
          </Badge>
          <PageHeader
            className="mt-4"
            title={product.title}
            description={product.description}
          />
          <Text variant="price" className="mt-4">
            {product.price}
          </Text>
          <Text variant="caption" className="mt-1">
            Origine : {product.origin}
          </Text>
        </header>

        <section className="mt-10">
          <Title as="h2" variant="h3">
            Points forts
          </Title>
          <List className="mt-4">
            {product.highlights.map((highlight) => (
              <ListItem key={highlight}>{highlight}</ListItem>
            ))}
          </List>
        </section>
      </article>

      <Grid cols={2} className="mt-12">
        <RelatedLinks title="Guides liés" links={relatedGuideLinks} />
        <RelatedLinks title="Autres produits" links={relatedProductLinks} />
      </Grid>
    </Page>
  );
}
