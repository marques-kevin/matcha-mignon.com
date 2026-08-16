import { SEO_LIMITS } from "./constants";
import {
  countTags,
  extractJsonLd,
  getHtmlLang,
  getLinkHref,
  getMetaContent,
  getTitle,
} from "./html";
import type { AuditIssue, RobotsMeta, SeoPage } from "./types";

export function canonicalToRoute(canonical: string): string | null {
  try {
    const url = new URL(canonical);
    return url.pathname.replace(/\/$/, "") || "/";
  } catch {
    return null;
  }
}

export function parseRobots(robots: string | null): RobotsMeta {
  if (!robots) return { index: null, follow: null };

  const lower = robots.toLowerCase();
  return {
    index: lower.includes("noindex")
      ? false
      : lower.includes("index")
      ? true
      : null,
    follow: lower.includes("nofollow")
      ? false
      : lower.includes("follow")
      ? true
      : null,
    raw: robots,
  };
}

export function extractSeo(
  html: string,
  route: string,
  siteUrl: string
): SeoPage {
  const title = getTitle(html);
  const description = getMetaContent(html, { name: "description" });
  const robots = parseRobots(getMetaContent(html, { name: "robots" }));
  const canonical = getLinkHref(html, "canonical");
  const canonicalRoute = canonical ? canonicalToRoute(canonical) : null;
  const expectedCanonical = `${siteUrl}${route === "/" ? "" : route}`;

  const jsonLd = extractJsonLd(html);

  return {
    route,
    title,
    titleLength: title?.length ?? 0,
    description,
    descriptionLength: description?.length ?? 0,
    robots,
    canonical,
    canonicalRoute,
    canonicalMatch: canonical === expectedCanonical,
    lang: getHtmlLang(html),
    h1Count: countTags(html, "h1"),
    h2Count: countTags(html, "h2"),
    meta: {
      keywords: getMetaContent(html, { name: "keywords" }),
      author: getMetaContent(html, { name: "author" }),
      ogTitle: getMetaContent(html, { property: "og:title" }),
      ogDescription: getMetaContent(html, { property: "og:description" }),
      ogUrl: getMetaContent(html, { property: "og:url" }),
      ogType: getMetaContent(html, { property: "og:type" }),
      ogLocale: getMetaContent(html, { property: "og:locale" }),
      twitterCard: getMetaContent(html, { name: "twitter:card" }),
      twitterTitle: getMetaContent(html, { name: "twitter:title" }),
      twitterDescription: getMetaContent(html, { name: "twitter:description" }),
    },
    jsonLd: {
      count: jsonLd.length,
      types: jsonLd
        .filter((item) => !item.parseError)
        .map((item) => item["@type"] as string)
        .filter(Boolean),
      parseErrors: jsonLd.filter((item) => item.parseError).length,
    },
  };
}

export function validateSeo(page: SeoPage): AuditIssue[] {
  const issues: AuditIssue[] = [];

  if (!page.title) {
    issues.push({
      level: "error",
      code: "missing-title",
      message: "Balise <title> manquante",
    });
  } else {
    if (page.titleLength < SEO_LIMITS.title.min) {
      issues.push({
        level: "warning",
        code: "title-too-short",
        message: `Title trop court (${page.titleLength} car., min ${SEO_LIMITS.title.min})`,
      });
    }
    if (page.titleLength > SEO_LIMITS.title.warn) {
      issues.push({
        level: "warning",
        code: "title-too-long",
        message: `Title trop long (${page.titleLength} car., max recommandé ${SEO_LIMITS.title.max})`,
      });
    }
  }

  if (!page.description) {
    issues.push({
      level: "error",
      code: "missing-description",
      message: "Meta description manquante",
    });
  } else {
    if (page.descriptionLength < SEO_LIMITS.description.min) {
      issues.push({
        level: "warning",
        code: "description-too-short",
        message: `Description trop courte (${page.descriptionLength} car., min ${SEO_LIMITS.description.min})`,
      });
    }
    if (page.descriptionLength > SEO_LIMITS.description.warn) {
      issues.push({
        level: "warning",
        code: "description-too-long",
        message: `Description trop longue (${page.descriptionLength} car., max recommandé ${SEO_LIMITS.description.max})`,
      });
    }
  }

  if (!page.canonical) {
    issues.push({
      level: "error",
      code: "missing-canonical",
      message: "Lien canonical manquant",
    });
  } else if (!page.canonicalMatch) {
    issues.push({
      level: "error",
      code: "canonical-mismatch",
      message: `Canonical incorrect: ${page.canonical}`,
    });
  }

  if (page.robots.index === false) {
    issues.push({
      level: "warning",
      code: "noindex",
      message: `Page en noindex (${page.robots.raw})`,
    });
  }

  if (page.h1Count === 0) {
    issues.push({
      level: "error",
      code: "missing-h1",
      message: "Aucun <h1> trouvé",
    });
  } else if (page.h1Count > 1) {
    issues.push({
      level: "error",
      code: "multiple-h1",
      message: `${page.h1Count} balises <h1> trouvées (attendu: 1)`,
    });
  }

  if (!page.lang) {
    issues.push({
      level: "warning",
      code: "missing-lang",
      message: "Attribut lang manquant sur <html>",
    });
  }

  const requiredMeta: [string, string | null][] = [
    ["og:title", page.meta.ogTitle],
    ["og:description", page.meta.ogDescription],
    ["og:url", page.meta.ogUrl],
    ["twitter:card", page.meta.twitterCard],
    ["twitter:title", page.meta.twitterTitle],
  ];

  for (const [name, value] of requiredMeta) {
    if (!value) {
      issues.push({
        level: "warning",
        code: "missing-meta",
        message: `Meta ${name} manquante`,
      });
    }
  }

  if (page.jsonLd.parseErrors > 0) {
    issues.push({
      level: "error",
      code: "jsonld-parse-error",
      message: "JSON-LD invalide",
    });
  }

  return issues;
}

export function findDuplicates(
  pages: SeoPage[],
  field: "title" | "description"
): { value: string; routes: string[] }[] {
  const map = new Map<string, string[]>();

  for (const page of pages) {
    const value = page[field];
    if (!value) continue;
    if (!map.has(value)) map.set(value, []);
    map.get(value)!.push(page.route);
  }

  return [...map.entries()]
    .filter(([, routes]) => routes.length > 1)
    .map(([value, routes]) => ({ value, routes }));
}

export function applyDuplicateIssues(
  pages: SeoPage[],
  duplicateTitles: { value: string; routes: string[] }[],
  duplicateDescriptions: { value: string; routes: string[] }[]
): SeoPage[] {
  const updated = pages.map((page) => ({
    ...page,
    issues: [...(page.issues ?? [])],
  }));

  for (const dup of duplicateTitles) {
    for (const route of dup.routes) {
      const page = updated.find((p) => p.route === route);
      page?.issues?.push({
        level: "error",
        code: "duplicate-title",
        message: `Title dupliqué avec ${dup.routes
          .filter((r) => r !== route)
          .join(", ")}`,
      });
    }
  }

  for (const dup of duplicateDescriptions) {
    for (const route of dup.routes) {
      const page = updated.find((p) => p.route === route);
      page?.issues?.push({
        level: "warning",
        code: "duplicate-description",
        message: `Description dupliquée avec ${dup.routes
          .filter((r) => r !== route)
          .join(", ")}`,
      });
    }
  }

  return updated;
}
