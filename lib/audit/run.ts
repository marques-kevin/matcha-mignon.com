import { extractInternalLinks, analyzeLinking } from "./linking";
import {
  applyDuplicateIssues,
  extractSeo,
  findDuplicates,
  validateSeo,
} from "./seo";
import { getIndexableRoutes, validateSitemap } from "./sitemap";
import type { AuditReport, PageInput, SeoPage } from "./types";

type RunAuditOptions = {
  lowInboundThreshold?: number;
  sitemapXml?: string | null;
};

export function runAudit(
  pageInputs: PageInput[],
  siteUrl: string,
  options: RunAuditOptions = {}
): AuditReport {
  const { lowInboundThreshold = 2, sitemapXml = null } = options;
  const pages = new Set(pageInputs.map((p) => p.route));
  const allLinks = pageInputs.flatMap((p) =>
    extractInternalLinks(p.html, p.route)
  );

  let seoPages: SeoPage[] = pageInputs.map((p) => {
    const seo = extractSeo(p.html, p.route, siteUrl);
    return { ...seo, issues: validateSeo(seo) };
  });

  const duplicateTitles = findDuplicates(seoPages, "title");
  const duplicateDescriptions = findDuplicates(seoPages, "description");
  seoPages = applyDuplicateIssues(
    seoPages,
    duplicateTitles,
    duplicateDescriptions
  ).map((page) => ({
    ...page,
    issues: page.issues ?? [],
  }));

  const linking = analyzeLinking(pages, allLinks, lowInboundThreshold);

  const noindexPages = seoPages
    .filter((p) => p.robots.index === false)
    .map((p) => p.route);
  const indexableRoutes = getIndexableRoutes([...pages], noindexPages);
  const sitemap = validateSitemap(sitemapXml, siteUrl, indexableRoutes);

  const seoErrorCount = seoPages.reduce(
    (sum, page) =>
      sum + (page.issues?.filter((i) => i.level === "error").length ?? 0),
    0
  );
  const warningCount = seoPages.reduce(
    (sum, page) =>
      sum + (page.issues?.filter((i) => i.level === "warning").length ?? 0),
    0
  );
  const sitemapErrorCount = sitemap.issues.filter(
    (issue) => issue.level === "error"
  ).length;

  return {
    generatedAt: new Date().toISOString(),
    siteUrl,
    summary: {
      totalPages: pages.size,
      seoErrors: seoErrorCount,
      seoWarnings: warningCount,
      linkingErrors: linking.brokenLinks.length + linking.orphans.length,
      sitemapErrors: sitemapErrorCount,
    },
    seo: {
      errorCount: seoErrorCount,
      warningCount,
      duplicateTitles,
      duplicateDescriptions,
      noindexPages,
      pagesWithIssues: seoPages.filter((p) => (p.issues?.length ?? 0) > 0),
      pages: seoPages,
    },
    linking: {
      summary: {
        totalLinks: linking.internalLinks.length,
        uniqueLinks: new Set(
          linking.internalLinks.map((l) => `${l.source}->${l.target}`)
        ).size,
        orphanPages: linking.orphans.length,
        brokenLinks: linking.brokenLinks.length,
        lowInboundThreshold,
        lowInboundPages: linking.lowInbound.length,
        maxCrawlDepth: linking.maxCrawlDepth,
        averageCrawlDepth: linking.averageCrawlDepth,
      },
      orphans: linking.orphans.map((page) => ({
        route: page.route,
        inboundCount: page.inboundCount,
        inboundFrom: page.inboundFrom,
      })),
      lowInbound: linking.lowInbound,
      brokenLinks: linking.brokenLinks,
      pages: linking.linkingPages,
    },
    sitemap: {
      errorCount: sitemapErrorCount,
      issues: sitemap.issues,
      urlCount: sitemap.urlCount,
      sitemapRoutes: sitemap.sitemapRoutes,
      indexableRoutes: sitemap.indexableRoutes,
      missingFromSitemap: sitemap.missingFromSitemap,
      extraInSitemap: sitemap.extraInSitemap,
    },
  };
}

export function hasAuditErrors(report: AuditReport): boolean {
  return (
    report.seo.errorCount > 0 ||
    report.linking.summary.brokenLinks > 0 ||
    report.linking.summary.orphanPages > 0 ||
    report.sitemap.errorCount > 0
  );
}
