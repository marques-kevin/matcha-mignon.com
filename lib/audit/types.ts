export type AuditIssue = {
  level: "error" | "warning";
  code: string;
  message: string;
};

export type RobotsMeta = {
  index: boolean | null;
  follow: boolean | null;
  raw?: string;
};

export type SeoPage = {
  route: string;
  title: string | null;
  titleLength: number;
  description: string | null;
  descriptionLength: number;
  robots: RobotsMeta;
  canonical: string | null;
  canonicalRoute: string | null;
  canonicalMatch: boolean;
  lang: string | null;
  h1Count: number;
  h2Count: number;
  meta: {
    keywords: string | null;
    author: string | null;
    ogTitle: string | null;
    ogDescription: string | null;
    ogUrl: string | null;
    ogType: string | null;
    ogLocale: string | null;
    twitterCard: string | null;
    twitterTitle: string | null;
    twitterDescription: string | null;
  };
  jsonLd: {
    count: number;
    types: string[];
    parseErrors: number;
  };
  issues?: AuditIssue[];
};

export type InternalLink = {
  source: string;
  target: string;
  href: string;
};

export type LinkingPageReport = {
  route: string;
  inboundCount: number;
  outboundCount: number;
  inboundFrom: string[];
  outboundTo: string[];
  crawlDepth: number | null;
  linkJuice: number;
};

export type DuplicateEntry = {
  value: string;
  routes: string[];
};

export type AuditReport = {
  generatedAt: string;
  siteUrl: string;
  summary: {
    totalPages: number;
    seoErrors: number;
    seoWarnings: number;
    linkingErrors: number;
    sitemapErrors: number;
  };
  seo: {
    errorCount: number;
    warningCount: number;
    duplicateTitles: DuplicateEntry[];
    duplicateDescriptions: DuplicateEntry[];
    noindexPages: string[];
    pagesWithIssues: SeoPage[];
    pages: SeoPage[];
  };
  linking: {
    summary: {
      totalLinks: number;
      uniqueLinks: number;
      orphanPages: number;
      brokenLinks: number;
      lowInboundThreshold: number;
      lowInboundPages: number;
      maxCrawlDepth: number;
      averageCrawlDepth: number;
    };
    orphans: {
      route: string;
      inboundCount: number;
      inboundFrom: string[];
    }[];
    lowInbound: { route: string; inboundCount: number }[];
    brokenLinks: InternalLink[];
    pages: LinkingPageReport[];
  };
  sitemap: {
    errorCount: number;
    issues: AuditIssue[];
    urlCount: number;
    sitemapRoutes: string[];
    indexableRoutes: string[];
    missingFromSitemap: string[];
    extraInSitemap: string[];
  };
};

export type PageInput = {
  route: string;
  html: string;
};
