import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ContentBlocks } from "@/components/ContentBlocks";
import { JsonLd } from "@/components/JsonLd";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Grid, Page, PageHeader, Prose } from "@/components/ui";
import { getAllGuideSlugs, getGuide, guides } from "@/lib/content/guides";
import { getProduct } from "@/lib/content/products";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  return buildMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guide/${guide.slug}`,
    keywords: guide.keywords,
    type: "article",
    publishedAt: guide.publishedAt,
    updatedAt: guide.updatedAt,
  });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const relatedGuideLinks = guide.relatedGuides
    .map((s) => {
      const g = guides.find((x) => x.slug === s);
      return g ? { href: `/guide/${g.slug}`, label: g.title } : null;
    })
    .filter(Boolean) as { href: string; label: string }[];

  const relatedProductLinks = guide.relatedProducts
    .map((s) => {
      const p = getProduct(s);
      return p ? { href: `/produits/${p.slug}`, label: p.title } : null;
    })
    .filter(Boolean) as { href: string; label: string }[];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    author: { "@type": "Organization", name: siteConfig.author },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: `${siteConfig.url}/guide/${guide.slug}`,
    inLanguage: "fr-FR",
    keywords: guide.keywords.join(", "),
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
        name: "Guides",
        item: `${siteConfig.url}/guide`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title,
        item: `${siteConfig.url}/guide/${guide.slug}`,
      },
    ],
  };

  return (
    <Page>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <Breadcrumb
        items={[{ label: "Guides", href: "/guide" }, { label: guide.title }]}
      />
      <article>
        <PageHeader
          className="mt-6"
          title={guide.title}
          description={guide.description}
          meta={`${guide.readingTime} de lecture · Mis à jour le ${new Date(
            guide.updatedAt
          ).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}`}
        />

        <Prose className="mt-10">
          {guide.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              <p>
                <ContentBlocks blocks={section.content} />
              </p>
            </section>
          ))}
        </Prose>
      </article>

      <Grid cols={2} className="mt-12">
        <RelatedLinks title="Guides liés" links={relatedGuideLinks} />
        <RelatedLinks
          title="Produits recommandés"
          links={relatedProductLinks}
        />
      </Grid>
    </Page>
  );
}
