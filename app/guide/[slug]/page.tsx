import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ContentBlocks, GuideFigure } from "@/components/ContentBlocks";
import { JsonLd } from "@/components/JsonLd";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Page, PageHeader, Prose } from "@/components/ui";
import { getAllGuideSlugs, getGuide, guides } from "@/lib/content/guides";
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
    image: {
      src: guide.cover.src,
      alt: guide.cover.alt,
      width: guide.cover.width,
      height: guide.cover.height,
    },
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
    image: `${siteConfig.url}${guide.cover.src}`,
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
          <GuideFigure image={guide.cover} loading="eager" />
          {guide.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              <ContentBlocks blocks={section.content} />
            </section>
          ))}
        </Prose>
      </article>

      <div className="mt-12">
        <RelatedLinks title="Guides liés" links={relatedGuideLinks} />
      </div>
    </Page>
  );
}
