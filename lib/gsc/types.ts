export type GscQueryRow = {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

export type GscPageRow = {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

export type GscOpportunity = {
  type: "low_ctr" | "striking_distance" | "high_impressions";
  query: string;
  page?: string;
  impressions: number;
  ctr: number;
  position: number;
  reason: string;
};

export type GscReport = {
  generatedAt: string;
  siteUrl: string;
  period: {
    startDate: string;
    endDate: string;
  };
  summary: {
    totalClicks: number;
    totalImpressions: number;
    averageCtr: number;
    averagePosition: number;
  };
  topQueries: GscQueryRow[];
  topPages: GscPageRow[];
  opportunities: GscOpportunity[];
};
