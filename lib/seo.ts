import type { Metadata } from "next";
import { siteConfig } from "./site";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedAt?: string;
  updatedAt?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
  publishedAt,
  updatedAt,
}: PageSeo): Metadata {
  const url = `${siteConfig.url}${path}`;
  const isHome = path === "/";
  const pageTitle = isHome ? `${siteConfig.name} — ${siteConfig.tagline}` : title;
  const socialTitle = isHome ? pageTitle : `${title} | ${siteConfig.name}`;

  return {
    title: isHome ? { absolute: pageTitle } : pageTitle,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      ...(publishedAt && { publishedTime: publishedAt }),
      ...(updatedAt && { modifiedTime: updatedAt }),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
