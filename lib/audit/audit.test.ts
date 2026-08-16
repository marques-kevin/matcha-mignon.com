import { describe, expect, it } from "vitest";
import { fileToRoute, getMetaContent, getTitle } from "./html";
import {
  computeCrawlDepth,
  computeLinkJuice,
  extractInternalLinks,
  normalizeInternalHref,
  normalizeLinkJuiceScores,
} from "./linking";
import {
  canonicalToRoute,
  extractSeo,
  findDuplicates,
  parseRobots,
  validateSeo,
} from "./seo";
import { hasAuditErrors, runAudit } from "./run";
import { parseSitemapLocs, urlToRoute, validateSitemap } from "./sitemap";

const SITE_URL = "https://matcha-mignon.com";

function buildSitemap(routes: string[]) {
  const urls = routes
    .map((route) => `${SITE_URL}${route === "/" ? "" : route}`)
    .map((loc) => `<url><loc>${loc}</loc></url>`)
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
}

function buildHtml(
  options: {
    title?: string | null;
    description?: string | null;
    robots?: string | null;
    canonical?: string | null;
    lang?: string | null;
    h1?: string;
    extraH1?: boolean;
    links?: string[];
    jsonLd?: string;
    og?: Partial<Record<"title" | "description" | "url", string>>;
    twitter?: Partial<Record<"card" | "title", string>>;
  } = {}
) {
  const {
    title = "Guide matcha complet pour débutants",
    description = "Découvrez comment choisir, préparer et déguster le matcha avec nos conseils pratiques pour bien débuter.",
    robots = "index, follow",
    canonical = `${SITE_URL}/guide`,
    lang = "fr",
    h1 = "Guide matcha",
    extraH1 = false,
    links = ["/", "/produits"],
    jsonLd = '{"@type":"Article","headline":"Guide matcha"}',
    og = {
      title: "Guide matcha",
      description,
      url: canonical,
    },
    twitter = { card: "summary_large_image", title: "Guide matcha" },
  } = options;

  const metaTags = [
    description !== null
      ? `<meta name="description" content="${description}" />`
      : "",
    robots !== null ? `<meta name="robots" content="${robots}" />` : "",
    og.title ? `<meta property="og:title" content="${og.title}" />` : "",
    og.description
      ? `<meta property="og:description" content="${og.description}" />`
      : "",
    og.url ? `<meta property="og:url" content="${og.url}" />` : "",
    twitter.card
      ? `<meta name="twitter:card" content="${twitter.card}" />`
      : "",
    twitter.title
      ? `<meta name="twitter:title" content="${twitter.title}" />`
      : "",
  ].join("");

  const linkTags = canonical
    ? `<link rel="canonical" href="${canonical}" />`
    : "";

  return `<!DOCTYPE html>
<html lang="${lang ?? ""}">
<head>
  ${title !== null ? `<title>${title}</title>` : ""}
  ${metaTags}
  ${linkTags}
  <script type="application/ld+json">${jsonLd}</script>
</head>
<body>
  <h1>${h1}</h1>
  ${extraH1 ? "<h1>Second heading</h1>" : ""}
  ${links.map((href) => `<a href="${href}">link</a>`).join("")}
</body>
</html>`;
}

describe("html parsers", () => {
  it("extracts title and decodes entities", () => {
    const html = "<title>Qu&#x27;est-ce que le matcha ?</title>";
    expect(getTitle(html)).toBe("Qu'est-ce que le matcha ?");
  });

  it("reads meta content regardless of attribute order", () => {
    const html =
      '<meta content="Description test" name="description" /><meta property="og:title" content="OG title" />';
    expect(getMetaContent(html, { name: "description" })).toBe(
      "Description test"
    );
    expect(getMetaContent(html, { property: "og:title" })).toBe("OG title");
  });

  it("maps exported html files to routes", () => {
    const outDir = "/project/out";
    expect(fileToRoute("/project/out/index.html", outDir)).toBe("/");
    expect(fileToRoute("/project/out/guide.html", outDir)).toBe("/guide");
    expect(fileToRoute("/project/out/guide/matcha.html", outDir)).toBe(
      "/guide/matcha"
    );
  });
});

describe("parseRobots", () => {
  it("detects index and follow", () => {
    expect(parseRobots("index, follow")).toEqual({
      index: true,
      follow: true,
      raw: "index, follow",
    });
  });

  it("detects noindex", () => {
    expect(parseRobots("noindex, follow").index).toBe(false);
  });
});

describe("extractSeo", () => {
  it("extracts a valid seo page", () => {
    const seo = extractSeo(buildHtml(), "/guide", SITE_URL);

    expect(seo.title).toContain("Guide matcha");
    expect(seo.description).toContain("Découvrez comment choisir");
    expect(seo.canonicalMatch).toBe(true);
    expect(seo.h1Count).toBe(1);
    expect(seo.meta.ogTitle).toBe("Guide matcha");
    expect(seo.jsonLd.types).toContain("Article");
  });

  it("flags canonical mismatch", () => {
    const seo = extractSeo(
      buildHtml({ canonical: `${SITE_URL}/wrong-url` }),
      "/guide",
      SITE_URL
    );

    expect(seo.canonicalMatch).toBe(false);
  });
});

describe("validateSeo", () => {
  it("returns no issues for a valid page", () => {
    const seo = extractSeo(buildHtml(), "/guide", SITE_URL);
    expect(validateSeo(seo)).toEqual([]);
  });

  it("detects missing title and description", () => {
    const seo = extractSeo(
      buildHtml({ title: null, description: null, canonical: null }),
      "/guide",
      SITE_URL
    );

    const codes = validateSeo(seo).map((issue) => issue.code);
    expect(codes).toContain("missing-title");
    expect(codes).toContain("missing-description");
    expect(codes).toContain("missing-canonical");
  });

  it("warns on short title and description", () => {
    const seo = extractSeo(
      buildHtml({ title: "Court", description: "Trop court" }),
      "/guide",
      SITE_URL
    );

    const codes = validateSeo(seo).map((issue) => issue.code);
    expect(codes).toContain("title-too-short");
    expect(codes).toContain("description-too-short");
  });

  it("errors on missing or multiple h1", () => {
    const missing = extractSeo(
      buildHtml({ h1: "" }).replace("<h1></h1>", ""),
      "/guide",
      SITE_URL
    );
    expect(validateSeo(missing).some((i) => i.code === "missing-h1")).toBe(
      true
    );

    const multiple = extractSeo(
      buildHtml({ extraH1: true }),
      "/guide",
      SITE_URL
    );
    expect(validateSeo(multiple).some((i) => i.code === "multiple-h1")).toBe(
      true
    );
  });

  it("warns on noindex pages", () => {
    const seo = extractSeo(
      buildHtml({ robots: "noindex, follow" }),
      "/guide",
      SITE_URL
    );
    expect(validateSeo(seo).some((i) => i.code === "noindex")).toBe(true);
  });

  it("errors on invalid json-ld", () => {
    const seo = extractSeo(
      buildHtml({ jsonLd: "{ invalid json" }),
      "/guide",
      SITE_URL
    );
    expect(validateSeo(seo).some((i) => i.code === "jsonld-parse-error")).toBe(
      true
    );
  });
});

describe("findDuplicates", () => {
  it("finds duplicate titles across pages", () => {
    const pages = [
      extractSeo(
        buildHtml({ title: "Same title here for test" }),
        "/a",
        SITE_URL
      ),
      extractSeo(
        buildHtml({ title: "Same title here for test" }),
        "/b",
        SITE_URL
      ),
      extractSeo(
        buildHtml({ title: "Different title for page" }),
        "/c",
        SITE_URL
      ),
    ];

    const duplicates = findDuplicates(pages, "title");
    expect(duplicates).toHaveLength(1);
    expect(duplicates[0].routes).toEqual(["/a", "/b"]);
  });
});

describe("internal linking", () => {
  it("normalizes internal hrefs", () => {
    expect(normalizeInternalHref("/guide/")).toBe("/guide");
    expect(normalizeInternalHref("#section")).toBeNull();
    expect(normalizeInternalHref("https://external.com")).toBeNull();
    expect(normalizeInternalHref("/_next/static/chunk.js")).toBeNull();
  });

  it("detects broken links and orphan pages", () => {
    const report = runAudit(
      [
        {
          route: "/",
          html: buildHtml({
            title: "Home page title for SEO audit tests",
            canonical: SITE_URL,
            links: ["/missing"],
          }),
        },
        {
          route: "/orphan",
          html: buildHtml({
            title: "Orphan page title for SEO audit tests",
            canonical: `${SITE_URL}/orphan`,
            links: [],
          }),
        },
      ],
      SITE_URL,
      { lowInboundThreshold: 2 }
    );

    expect(report.linking.summary.brokenLinks).toBe(1);
    expect(report.linking.brokenLinks[0].href).toBe("/missing");
    expect(report.linking.summary.orphanPages).toBe(1);
    expect(report.linking.orphans[0].route).toBe("/orphan");
    expect(report.linking.orphans[0].inboundCount).toBe(0);
    expect(hasAuditErrors(report)).toBe(true);
  });

  it("treats pages unreachable from / as orphans even with inbound links", () => {
    const report = runAudit(
      [
        {
          route: "/",
          html: buildHtml({
            title: "Home page title for SEO audit tests",
            canonical: SITE_URL,
            links: ["/guide"],
          }),
        },
        {
          route: "/guide",
          html: buildHtml({
            title: "Guide page title for SEO audit tests",
            canonical: `${SITE_URL}/guide`,
            links: ["/"],
          }),
        },
        {
          route: "/annuaire",
          html: buildHtml({
            title: "Annuaire page title for SEO audit tests",
            canonical: `${SITE_URL}/annuaire`,
            links: ["/a-propos"],
          }),
        },
        {
          route: "/a-propos",
          html: buildHtml({
            title: "About page title for SEO audit tests",
            canonical: `${SITE_URL}/a-propos`,
            links: ["/annuaire"],
          }),
        },
      ],
      SITE_URL
    );

    expect(report.linking.summary.orphanPages).toBe(2);
    expect(report.linking.orphans.map((page) => page.route).sort()).toEqual([
      "/a-propos",
      "/annuaire",
    ]);
    expect(hasAuditErrors(report)).toBe(true);
  });

  it("extracts internal links from html", () => {
    const links = extractInternalLinks(
      '<a href="/guide">g</a><a href="https://x.com">x</a>',
      "/"
    );
    expect(links).toEqual([{ source: "/", target: "/guide", href: "/guide" }]);
  });

  it("computes crawl depth from homepage", () => {
    const pages = new Set(["/", "/guide", "/guide/article", "/orphan"]);
    const outbound = new Map<string, Set<string>>([
      ["/", new Set(["/guide"])],
      ["/guide", new Set(["/guide/article"])],
      ["/guide/article", new Set<string>()],
      ["/orphan", new Set<string>()],
    ]);

    const depths = computeCrawlDepth(pages, outbound);

    expect(depths.get("/")).toBe(0);
    expect(depths.get("/guide")).toBe(1);
    expect(depths.get("/guide/article")).toBe(2);
    expect(depths.get("/orphan")).toBeNull();
  });

  it("computes normalized link juice scores", () => {
    const pages = ["/", "/guide", "/produits"];
    const outbound = new Map<string, Set<string>>([
      ["/", new Set(["/guide", "/produits"])],
      ["/guide", new Set(["/"])],
      ["/produits", new Set(["/"])],
    ]);

    const scores = normalizeLinkJuiceScores(computeLinkJuice(pages, outbound));

    expect(scores.get("/")).toBe(100);
    expect(scores.get("/guide")).toBeGreaterThan(0);
    expect(scores.get("/produits")).toBeGreaterThan(0);
  });

  it("includes crawl depth and link juice in audit report", () => {
    const report = runAudit(
      [
        {
          route: "/",
          html: buildHtml({
            title: "Home page title for SEO audit tests",
            canonical: SITE_URL,
            links: ["/guide", "/deep"],
          }),
        },
        {
          route: "/guide",
          html: buildHtml({
            title: "Guide page title for SEO audit tests",
            canonical: `${SITE_URL}/guide`,
            links: ["/deep"],
          }),
        },
        {
          route: "/deep",
          html: buildHtml({
            title: "Deep page title for SEO audit tests",
            canonical: `${SITE_URL}/deep`,
            links: ["/"],
          }),
        },
      ],
      SITE_URL
    );

    const home = report.linking.pages.find((page) => page.route === "/");
    const guide = report.linking.pages.find((page) => page.route === "/guide");
    const deep = report.linking.pages.find((page) => page.route === "/deep");

    expect(home?.crawlDepth).toBe(0);
    expect(guide?.crawlDepth).toBe(1);
    expect(deep?.crawlDepth).toBe(1);
    expect(
      Math.max(...report.linking.pages.map((page) => page.linkJuice))
    ).toBe(100);
    expect(home?.linkJuice).toBeGreaterThan(90);
    expect(report.linking.summary.maxCrawlDepth).toBe(1);
  });
});

describe("runAudit", () => {
  it("returns a clean report for valid pages", () => {
    const report = runAudit(
      [
        {
          route: "/",
          html: buildHtml({
            title: "Home page title for SEO audit tests",
            canonical: SITE_URL,
            links: ["/guide"],
          }),
        },
        {
          route: "/guide",
          html: buildHtml({
            title: "Guide page title for SEO audit tests",
            canonical: `${SITE_URL}/guide`,
            links: ["/"],
          }),
        },
      ],
      SITE_URL,
      { sitemapXml: buildSitemap(["/", "/guide"]) }
    );

    expect(report.summary.totalPages).toBe(2);
    expect(report.seo.errorCount).toBe(0);
    expect(report.linking.summary.brokenLinks).toBe(0);
    expect(report.linking.summary.orphanPages).toBe(0);
    expect(report.sitemap.errorCount).toBe(0);
    expect(hasAuditErrors(report)).toBe(false);
  });

  it("adds duplicate title errors to affected pages", () => {
    const duplicateTitle = "Duplicate title for SEO audit test page";
    const report = runAudit(
      [
        {
          route: "/a",
          html: buildHtml({
            title: duplicateTitle,
            canonical: `${SITE_URL}/a`,
          }),
        },
        {
          route: "/b",
          html: buildHtml({
            title: duplicateTitle,
            canonical: `${SITE_URL}/b`,
          }),
        },
      ],
      SITE_URL
    );

    expect(report.seo.duplicateTitles).toHaveLength(1);
    expect(
      report.seo.pages.every((page) =>
        page.issues?.some((issue) => issue.code === "duplicate-title")
      )
    ).toBe(true);
    expect(hasAuditErrors(report)).toBe(true);
  });
});

describe("sitemap audit", () => {
  it("parses sitemap urls", () => {
    const xml = buildSitemap(["/", "/guide"]);
    expect(parseSitemapLocs(xml)).toHaveLength(2);
    expect(urlToRoute(`${SITE_URL}/guide`, SITE_URL)).toBe("/guide");
    expect(urlToRoute(`${SITE_URL}`, SITE_URL)).toBe("/");
  });

  it("errors when sitemap is missing", () => {
    const result = validateSitemap(null, SITE_URL, ["/", "/guide"]);
    expect(result.issues.some((i) => i.code === "sitemap-missing")).toBe(true);
    expect(result.missingFromSitemap).toEqual(["/", "/guide"]);
  });

  it("errors when indexable pages are missing from sitemap", () => {
    const result = validateSitemap(buildSitemap(["/"]), SITE_URL, [
      "/",
      "/guide",
    ]);

    expect(result.issues.some((i) => i.code === "sitemap-missing-pages")).toBe(
      true
    );
    expect(result.missingFromSitemap).toEqual(["/guide"]);
  });

  it("errors when sitemap contains non-indexable or unknown pages", () => {
    const result = validateSitemap(
      buildSitemap(["/", "/guide", "/secret"]),
      SITE_URL,
      ["/", "/guide"]
    );

    expect(result.issues.some((i) => i.code === "sitemap-extra-pages")).toBe(
      true
    );
    expect(result.extraInSitemap).toEqual(["/secret"]);
  });

  it("excludes noindex pages from expected sitemap urls", () => {
    const report = runAudit(
      [
        {
          route: "/",
          html: buildHtml({
            title: "Home page title for SEO audit tests",
            canonical: SITE_URL,
            links: ["/private"],
          }),
        },
        {
          route: "/private",
          html: buildHtml({
            title: "Private page title for SEO audit tests",
            canonical: `${SITE_URL}/private`,
            robots: "noindex, follow",
            links: ["/"],
          }),
        },
      ],
      SITE_URL,
      { sitemapXml: buildSitemap(["/"]) }
    );

    expect(report.seo.noindexPages).toEqual(["/private"]);
    expect(report.sitemap.indexableRoutes).toEqual(["/"]);
    expect(report.sitemap.errorCount).toBe(0);
    expect(hasAuditErrors(report)).toBe(false);
  });

  it("fails audit when sitemap is incomplete", () => {
    const report = runAudit(
      [
        {
          route: "/",
          html: buildHtml({
            title: "Home page title for SEO audit tests",
            canonical: SITE_URL,
          }),
        },
        {
          route: "/guide",
          html: buildHtml({
            title: "Guide page title for SEO audit tests",
            canonical: `${SITE_URL}/guide`,
          }),
        },
      ],
      SITE_URL,
      { sitemapXml: buildSitemap(["/"]) }
    );

    expect(report.sitemap.errorCount).toBeGreaterThan(0);
    expect(hasAuditErrors(report)).toBe(true);
  });
});

describe("canonicalToRoute", () => {
  it("converts canonical url to route", () => {
    expect(canonicalToRoute("https://matcha-mignon.com/guide/test")).toBe(
      "/guide/test"
    );
    expect(canonicalToRoute("not-a-url")).toBeNull();
  });
});
