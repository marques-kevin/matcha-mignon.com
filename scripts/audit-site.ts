import fs from "fs";
import path from "path";
import { fileToRoute } from "@/lib/audit/html";
import { hasAuditErrors, runAudit } from "@/lib/audit/run";

const OUT_DIR = path.resolve("out");
const REPORT_DIR = path.resolve("reports");
const REPORT_FILE = path.join(REPORT_DIR, "audit-report.json");

function getAllHtmlFiles(dir: string): string[] {
  const files: string[] = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllHtmlFiles(fullPath));
      continue;
    }
    if (entry.name.endsWith(".html")) {
      files.push(fullPath);
    }
  }

  return files;
}

function formatRoute(route: string) {
  return route === "/" ? "/" : route;
}

function printReport(report: ReturnType<typeof runAudit>) {
  const { summary, linking, seo, sitemap } = report;

  console.log("\n=== Site Audit Report ===\n");

  console.log("--- SEO ---");
  console.log(`Pages: ${summary.totalPages}`);
  console.log(`Errors: ${seo.errorCount}`);
  console.log(`Warnings: ${seo.warningCount}`);
  console.log(`Duplicate titles: ${seo.duplicateTitles.length}`);
  console.log(`Duplicate descriptions: ${seo.duplicateDescriptions.length}`);
  console.log(`Noindex pages: ${seo.noindexPages.length}`);

  if (seo.pagesWithIssues.length > 0) {
    console.log("\n--- SEO issues by page ---");
    for (const page of seo.pagesWithIssues) {
      console.log(`\n  ${formatRoute(page.route)}`);
      for (const issue of page.issues ?? []) {
        const icon = issue.level === "error" ? "✗" : "⚠";
        console.log(`    ${icon} [${issue.code}] ${issue.message}`);
      }
    }
  }

  if (seo.duplicateTitles.length > 0) {
    console.log("\n--- Duplicate titles ---");
    for (const dup of seo.duplicateTitles) {
      console.log(`  "${dup.value}" → ${dup.routes.join(", ")}`);
    }
  }

  if (seo.duplicateDescriptions.length > 0) {
    console.log("\n--- Duplicate descriptions ---");
    for (const dup of seo.duplicateDescriptions) {
      console.log(
        `  "${dup.value.slice(0, 60)}..." → ${dup.routes.join(", ")}`
      );
    }
  }

  console.log("\n--- SEO overview ---");
  for (const page of seo.pages) {
    const status = page.issues?.some((i) => i.level === "error")
      ? "✗"
      : (page.issues?.length ?? 0) > 0
      ? "⚠"
      : "✓";
    console.log(
      `  ${status} ${formatRoute(page.route).padEnd(40)} title: ${String(
        page.titleLength
      ).padStart(3)}c  desc: ${String(page.descriptionLength).padStart(
        3
      )}c  h1: ${page.h1Count}  index: ${
        page.robots.index === false ? "no" : "yes"
      }`
    );
  }

  console.log("\n--- Internal linking ---");
  console.log(`Internal links: ${linking.summary.totalLinks}`);
  console.log(`Orphan pages: ${linking.summary.orphanPages}`);
  console.log(`Broken links: ${linking.summary.brokenLinks}`);
  console.log(`Max crawl depth: ${linking.summary.maxCrawlDepth}`);
  console.log(`Average crawl depth: ${linking.summary.averageCrawlDepth}`);

  console.log("\n--- Link graph ---");
  const sortedPages = [...linking.pages].sort((a, b) => {
    if (a.crawlDepth === null && b.crawlDepth === null) {
      return a.route.localeCompare(b.route);
    }
    if (a.crawlDepth === null) return 1;
    if (b.crawlDepth === null) return -1;
    if (a.crawlDepth !== b.crawlDepth) return a.crawlDepth - b.crawlDepth;
    return b.linkJuice - a.linkJuice;
  });

  for (const page of sortedPages) {
    const depth =
      page.crawlDepth === null ? "  -" : String(page.crawlDepth).padStart(2);
    console.log(
      `  ${formatRoute(page.route).padEnd(40)} depth: ${depth}  juice: ${String(
        page.linkJuice
      ).padStart(3)}  in: ${String(page.inboundCount).padStart(
        2
      )}  out: ${String(page.outboundCount).padStart(2)}`
    );
  }

  if (linking.orphans.length > 0) {
    console.log("\n  Orphans (unreachable from /):");
    for (const page of linking.orphans) {
      const sources =
        page.inboundFrom.length > 0
          ? `isolated with ${page.inboundFrom.join(", ")}`
          : "no inbound links";
      console.log(`    - ${formatRoute(page.route)} (${sources})`);
    }
  }

  if (linking.brokenLinks.length > 0) {
    console.log("\n  Broken links:");
    for (const link of linking.brokenLinks) {
      console.log(`    - ${formatRoute(link.source)} → ${link.href}`);
    }
  }

  console.log("\n--- Sitemap ---");
  console.log(`URLs in sitemap: ${sitemap.urlCount}`);
  console.log(`Indexable pages: ${sitemap.indexableRoutes.length}`);
  console.log(`Missing from sitemap: ${sitemap.missingFromSitemap.length}`);
  console.log(`Extra in sitemap: ${sitemap.extraInSitemap.length}`);
  console.log(`Sitemap errors: ${sitemap.errorCount}`);

  if (sitemap.issues.length > 0) {
    for (const issue of sitemap.issues) {
      const icon = issue.level === "error" ? "✗" : "⚠";
      console.log(`  ${icon} [${issue.code}] ${issue.message}`);
    }
  }

  console.log(`\nJSON report: ${REPORT_FILE}\n`);
}

function main() {
  if (!fs.existsSync(OUT_DIR)) {
    console.error("Error: out/ not found. Run `npm run build` first.");
    process.exit(1);
  }

  const siteUrl = process.env.SITE_URL ?? "https://matcha-matcha.fr";
  const sitemapPath = path.join(OUT_DIR, "sitemap.xml");
  const sitemapXml = fs.existsSync(sitemapPath)
    ? fs.readFileSync(sitemapPath, "utf8")
    : null;

  const pageInputs = getAllHtmlFiles(OUT_DIR)
    .filter((file) => !file.includes(`${path.sep}404.html`))
    .map((file) => ({
      route: fileToRoute(file, OUT_DIR),
      html: fs.readFileSync(file, "utf8"),
    }));

  const report = runAudit(pageInputs, siteUrl, { sitemapXml });

  fs.mkdirSync(REPORT_DIR, { recursive: true });
  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));

  printReport(report);

  if (hasAuditErrors(report)) {
    process.exit(1);
  }
}

main();
