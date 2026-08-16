import type { AuditIssue } from "./types";

export function parseSitemapLocs(xml: string): string[] {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((match) =>
    match[1].trim()
  );
}

export function urlToRoute(loc: string, siteUrl: string): string | null {
  try {
    const url = new URL(loc);
    const base = new URL(siteUrl);
    if (url.origin !== base.origin) return null;
    return url.pathname.replace(/\/$/, "") || "/";
  } catch {
    return null;
  }
}

export function getIndexableRoutes(
  routes: string[],
  noindexRoutes: string[]
): string[] {
  const noindexSet = new Set(noindexRoutes);
  return routes.filter((route) => !noindexSet.has(route)).sort();
}

export type SitemapAuditResult = {
  issues: AuditIssue[];
  sitemapRoutes: string[];
  indexableRoutes: string[];
  missingFromSitemap: string[];
  extraInSitemap: string[];
  urlCount: number;
};

export function validateSitemap(
  sitemapXml: string | null | undefined,
  siteUrl: string,
  indexableRoutes: string[]
): SitemapAuditResult {
  const issues: AuditIssue[] = [];

  if (!sitemapXml?.trim()) {
    issues.push({
      level: "error",
      code: "sitemap-missing",
      message: "Sitemap non généré (sitemap.xml absent)",
    });

    return {
      issues,
      sitemapRoutes: [],
      indexableRoutes,
      missingFromSitemap: [...indexableRoutes],
      extraInSitemap: [],
      urlCount: 0,
    };
  }

  const locs = parseSitemapLocs(sitemapXml);
  const sitemapRoutes = [
    ...new Set(
      locs
        .map((loc) => urlToRoute(loc, siteUrl))
        .filter((route): route is string => route !== null)
    ),
  ].sort();

  const indexableSet = new Set(indexableRoutes);
  const sitemapSet = new Set(sitemapRoutes);

  const missingFromSitemap = indexableRoutes.filter(
    (route) => !sitemapSet.has(route)
  );
  const extraInSitemap = sitemapRoutes.filter(
    (route) => !indexableSet.has(route)
  );

  if (locs.length === 0) {
    issues.push({
      level: "error",
      code: "sitemap-empty",
      message: "Sitemap généré mais sans aucune URL",
    });
  }

  if (missingFromSitemap.length > 0) {
    issues.push({
      level: "error",
      code: "sitemap-missing-pages",
      message: `Pages indexables absentes du sitemap: ${missingFromSitemap.join(
        ", "
      )}`,
    });
  }

  if (extraInSitemap.length > 0) {
    issues.push({
      level: "error",
      code: "sitemap-extra-pages",
      message: `URLs dans le sitemap sans page indexable correspondante: ${extraInSitemap.join(
        ", "
      )}`,
    });
  }

  return {
    issues,
    sitemapRoutes,
    indexableRoutes,
    missingFromSitemap,
    extraInSitemap,
    urlCount: locs.length,
  };
}
