import type {
  GscOpportunity,
  GscPageRow,
  GscQueryRow,
  GscReport,
} from "./types";

type AnalyticsRow = {
  keys?: string[] | null;
  clicks?: number | null;
  impressions?: number | null;
  ctr?: number | null;
  position?: number | null;
};

function toQueryRows(rows: AnalyticsRow[]): GscQueryRow[] {
  return rows.map((row) => ({
    query: row.keys?.[0] ?? "",
    clicks: row.clicks ?? 0,
    impressions: row.impressions ?? 0,
    ctr: row.ctr ?? 0,
    position: row.position ?? 0,
  }));
}

function toPageRows(rows: AnalyticsRow[]): GscPageRow[] {
  return rows.map((row) => ({
    page: row.keys?.[0] ?? "",
    clicks: row.clicks ?? 0,
    impressions: row.impressions ?? 0,
    ctr: row.ctr ?? 0,
    position: row.position ?? 0,
  }));
}

function buildOpportunities(queries: GscQueryRow[]): GscOpportunity[] {
  const opportunities: GscOpportunity[] = [];

  for (const query of queries) {
    if (query.impressions >= 50 && query.ctr < 0.02) {
      opportunities.push({
        type: "low_ctr",
        query: query.query,
        impressions: query.impressions,
        ctr: query.ctr,
        position: query.position,
        reason: "Fort volume d'impressions avec un CTR faible",
      });
    }

    if (
      query.impressions >= 30 &&
      query.position >= 8 &&
      query.position <= 20
    ) {
      opportunities.push({
        type: "striking_distance",
        query: query.query,
        impressions: query.impressions,
        ctr: query.ctr,
        position: query.position,
        reason: "Requête en page 2 — potentiel d'optimisation",
      });
    }

    if (query.impressions >= 100) {
      opportunities.push({
        type: "high_impressions",
        query: query.query,
        impressions: query.impressions,
        ctr: query.ctr,
        position: query.position,
        reason: "Requête à fort volume — prioriser le contenu",
      });
    }
  }

  return opportunities
    .sort((left, right) => right.impressions - left.impressions)
    .slice(0, 15);
}

export function buildGscReport({
  siteUrl,
  startDate,
  endDate,
  queryRows,
  pageRows,
}: {
  siteUrl: string;
  startDate: string;
  endDate: string;
  queryRows: AnalyticsRow[];
  pageRows: AnalyticsRow[];
}): GscReport {
  const topQueries = toQueryRows(queryRows);
  const topPages = toPageRows(pageRows);

  const totalClicks = topQueries.reduce((sum, row) => sum + row.clicks, 0);
  const totalImpressions = topQueries.reduce(
    (sum, row) => sum + row.impressions,
    0
  );
  const averageCtr = totalImpressions > 0 ? totalClicks / totalImpressions : 0;
  const averagePosition =
    topQueries.length > 0
      ? topQueries.reduce((sum, row) => sum + row.position, 0) /
        topQueries.length
      : 0;

  return {
    generatedAt: new Date().toISOString(),
    siteUrl,
    period: { startDate, endDate },
    summary: {
      totalClicks,
      totalImpressions,
      averageCtr,
      averagePosition,
    },
    topQueries,
    topPages,
    opportunities: buildOpportunities(topQueries),
  };
}
