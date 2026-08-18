import type { Metadata } from "next";
import { siteConfig } from "./site";

type PageImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type PageSeo = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedAt?: string;
  updatedAt?: string;
  image?: PageImage;
};

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
  publishedAt,
  updatedAt,
  image,
}: PageSeo): Metadata {
  const isHome = path === "/";
  const url = `${siteConfig.url}${isHome ? "" : path}`;
  const pageTitle = isHome ? `${siteConfig.name} — ${siteConfig.tagline}` : title;
  const socialTitle = isHome ? pageTitle : `${title} | ${siteConfig.name}`;
  const ogImage = image
    ? {
        url: image.src,
        alt: image.alt,
        width: image.width,
        height: image.height,
      }
    : undefined;

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
      ...(ogImage && { images: [ogImage] }),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      ...(image && { images: [image.src] }),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
