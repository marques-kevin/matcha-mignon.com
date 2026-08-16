import type { InternalLink, LinkingPageReport } from "./types";

const HREF_REGEX = /href=["']([^"']+)["']/gi;
const STATIC_ASSET_EXTENSIONS = [
  ".svg",
  ".ico",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".css",
  ".js",
  ".woff",
  ".woff2",
  ".txt",
  ".xml",
];

export function isStaticAssetPath(pathname: string): boolean {
  const lowerPath = pathname.toLowerCase();
  return STATIC_ASSET_EXTENSIONS.some((extension) =>
    lowerPath.endsWith(extension)
  );
}

export function normalizeInternalHref(href: string): string | null {
  if (
    !href ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("javascript:")
  ) {
    return null;
  }

  if (href.startsWith("http://") || href.startsWith("https://")) {
    return null;
  }

  if (href.startsWith("/_next/")) {
    return null;
  }

  const [pathname] = href.split(/[?#]/);
  if (isStaticAssetPath(pathname)) {
    return null;
  }

  const normalized =
    pathname.endsWith("/") && pathname !== "/"
      ? pathname.slice(0, -1)
      : pathname;

  return normalized || "/";
}

export function extractInternalLinks(
  html: string,
  sourceRoute: string
): InternalLink[] {
  const links: InternalLink[] = [];
  let match: RegExpExecArray | null;

  const regex = new RegExp(HREF_REGEX.source, HREF_REGEX.flags);
  while ((match = regex.exec(html)) !== null) {
    const target = normalizeInternalHref(match[1]);
    if (!target) continue;

    links.push({ source: sourceRoute, target, href: match[1] });
  }

  return links;
}

export function buildGraph(pages: Set<string>, links: InternalLink[]) {
  const pageList = [...pages];
  const inbound = new Map(pageList.map((page) => [page, new Set<string>()]));
  const outbound = new Map(pageList.map((page) => [page, new Set<string>()]));

  for (const link of links) {
    if (!pages.has(link.source) || !pages.has(link.target)) continue;
    if (link.source === link.target) continue;

    outbound.get(link.source)!.add(link.target);
    inbound.get(link.target)!.add(link.source);
  }

  return { inbound, outbound };
}

export function computeCrawlDepth(
  pages: Set<string>,
  outbound: Map<string, Set<string>>,
  root = "/"
): Map<string, number | null> {
  const depths = new Map<string, number | null>(
    [...pages].map((page) => [page, null])
  );

  if (!pages.has(root)) {
    return depths;
  }

  const queue: { route: string; depth: number }[] = [{ route: root, depth: 0 }];
  depths.set(root, 0);

  while (queue.length > 0) {
    const current = queue.shift()!;
    const targets = outbound.get(current.route);
    if (!targets) continue;

    for (const target of targets) {
      if (depths.get(target) !== null) continue;
      depths.set(target, current.depth + 1);
      queue.push({ route: target, depth: current.depth + 1 });
    }
  }

  return depths;
}

export function computeLinkJuice(
  pages: string[],
  outbound: Map<string, Set<string>>,
  options: { damping?: number; iterations?: number } = {}
): Map<string, number> {
  const { damping = 0.85, iterations = 25 } = options;
  const pageCount = pages.length;

  if (pageCount === 0) {
    return new Map();
  }

  const scores = new Map(pages.map((page) => [page, 1 / pageCount]));

  for (let iteration = 0; iteration < iterations; iteration += 1) {
    const nextScores = new Map(
      pages.map((page) => [page, (1 - damping) / pageCount])
    );

    for (const page of pages) {
      const outLinks = [...(outbound.get(page) ?? [])];
      const pageScore = scores.get(page) ?? 0;

      if (outLinks.length === 0) {
        const redistribution = (damping * pageScore) / pageCount;
        for (const target of pages) {
          nextScores.set(target, nextScores.get(target)! + redistribution);
        }
        continue;
      }

      const share = (damping * pageScore) / outLinks.length;
      for (const target of outLinks) {
        nextScores.set(target, nextScores.get(target)! + share);
      }
    }

    for (const page of pages) {
      scores.set(page, nextScores.get(page)!);
    }
  }

  return scores;
}

export function normalizeLinkJuiceScores(
  scores: Map<string, number>
): Map<string, number> {
  const maxScore = Math.max(...scores.values(), 0);
  const normalized = new Map<string, number>();

  if (maxScore === 0) {
    for (const route of scores.keys()) {
      normalized.set(route, 0);
    }
    return normalized;
  }

  let topRoute: string | null = null;
  let topRounded = -1;

  for (const [route, score] of scores) {
    const rounded = Math.round((score / maxScore) * 100);
    normalized.set(route, rounded);
    if (rounded > topRounded) {
      topRounded = rounded;
      topRoute = route;
    }
  }

  if (topRoute) {
    normalized.set(topRoute, 100);
  }

  return normalized;
}

export function analyzeLinking(
  pages: Set<string>,
  allLinks: InternalLink[],
  lowInboundThreshold = 2
) {
  const internalLinks = allLinks.filter(
    (link) =>
      pages.has(link.source) &&
      pages.has(link.target) &&
      link.source !== link.target
  );
  const brokenLinks = allLinks.filter(
    (link) => pages.has(link.source) && !pages.has(link.target)
  );

  const { inbound, outbound } = buildGraph(pages, internalLinks);
  const pageList = [...pages].sort();
  const crawlDepths = computeCrawlDepth(pages, outbound);
  const rawJuice = computeLinkJuice(pageList, outbound);
  const linkJuice = normalizeLinkJuiceScores(rawJuice);

  const linkingPages: LinkingPageReport[] = pageList.map((route) => ({
    route,
    inboundCount: inbound.get(route)!.size,
    outboundCount: outbound.get(route)!.size,
    inboundFrom: [...inbound.get(route)!].sort(),
    outboundTo: [...outbound.get(route)!].sort(),
    crawlDepth: crawlDepths.get(route) ?? null,
    linkJuice: linkJuice.get(route) ?? 0,
  }));

  const orphans = linkingPages.filter(
    (page) => page.route !== "/" && page.crawlDepth === null
  );

  const orphanRoutes = new Set(orphans.map((page) => page.route));
  const lowInbound = linkingPages.filter(
    (page) =>
      page.route !== "/" &&
      !orphanRoutes.has(page.route) &&
      page.inboundCount < lowInboundThreshold
  );

  const reachablePages = linkingPages.filter(
    (page) => page.crawlDepth !== null
  );
  const maxCrawlDepth = reachablePages.reduce(
    (max, page) => Math.max(max, page.crawlDepth ?? 0),
    0
  );
  const averageCrawlDepth =
    reachablePages.length === 0
      ? 0
      : reachablePages.reduce((sum, page) => sum + (page.crawlDepth ?? 0), 0) /
        reachablePages.length;

  return {
    internalLinks,
    brokenLinks,
    linkingPages,
    orphans,
    lowInbound,
    maxCrawlDepth,
    averageCrawlDepth: Math.round(averageCrawlDepth * 10) / 10,
  };
}
