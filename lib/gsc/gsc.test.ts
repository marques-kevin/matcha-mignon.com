import { describe, expect, it, afterEach } from "vitest";
import { parseServiceAccountCredentials } from "./credentials";
import { resolveSiteUrl } from "./client";
import { buildGscReport } from "./report";

const sampleCredentials = {
  type: "service_account",
  project_id: "test-project",
  private_key_id: "key-id",
  private_key:
    "-----BEGIN PRIVATE KEY-----\\ntest\\n-----END PRIVATE KEY-----\\n",
  client_email: "test@example.iam.gserviceaccount.com",
  client_id: "123",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/test",
};

describe("parseServiceAccountCredentials", () => {
  const envFields = [
    "GSC_TYPE",
    "GSC_PROJECT_ID",
    "GSC_PRIVATE_KEY_ID",
    "GSC_PRIVATE_KEY",
    "GSC_CLIENT_EMAIL",
    "GSC_CLIENT_ID",
    "GSC_AUTH_URI",
    "GSC_TOKEN_URI",
    "GSC_AUTH_PROVIDER_X509_CERT_URL",
    "GSC_CLIENT_X509_CERT_URL",
    "GSC_APPLICATION_CREDENTIALS",
  ] as const;

  const originalEnv = Object.fromEntries(
    envFields.map((field) => [field, process.env[field]])
  );

  const sampleEnv = {
    GSC_TYPE: sampleCredentials.type,
    GSC_PROJECT_ID: sampleCredentials.project_id,
    GSC_PRIVATE_KEY_ID: sampleCredentials.private_key_id,
    GSC_PRIVATE_KEY: sampleCredentials.private_key,
    GSC_CLIENT_EMAIL: sampleCredentials.client_email,
    GSC_CLIENT_ID: sampleCredentials.client_id,
    GSC_AUTH_URI: sampleCredentials.auth_uri,
    GSC_TOKEN_URI: sampleCredentials.token_uri,
    GSC_AUTH_PROVIDER_X509_CERT_URL:
      sampleCredentials.auth_provider_x509_cert_url,
    GSC_CLIENT_X509_CERT_URL: sampleCredentials.client_x509_cert_url,
  };

  afterEach(() => {
    for (const field of envFields) {
      const value = originalEnv[field];

      if (value === undefined) {
        delete process.env[field];
      } else {
        process.env[field] = value;
      }
    }
  });

  it("parses flattened service account fields from .env", () => {
    for (const [field, value] of Object.entries(sampleEnv)) {
      process.env[field] = value;
    }
    delete process.env.GSC_APPLICATION_CREDENTIALS;

    expect(parseServiceAccountCredentials()).toEqual({
      ...sampleCredentials,
      private_key:
        "-----BEGIN PRIVATE KEY-----\ntest\n-----END PRIVATE KEY-----\n",
    });
  });

  it("throws when no credentials are configured", () => {
    for (const field of envFields) {
      delete process.env[field];
    }

    expect(() => parseServiceAccountCredentials()).toThrow(
      "Missing Google credentials"
    );
  });
});

describe("resolveSiteUrl", () => {
  const accessibleSites = [
    { siteUrl: "sc-domain:matcha-mignon.com" },
    { siteUrl: "https://example.com/" },
  ];

  it("matches URL prefix property", () => {
    expect(
      resolveSiteUrl("https://example.com/", [
        { siteUrl: "https://example.com/" },
      ])
    ).toBe("https://example.com/");
  });

  it("matches domain property from https URL config", () => {
    expect(resolveSiteUrl("https://matcha-mignon.com/", accessibleSites)).toBe(
      "sc-domain:matcha-mignon.com"
    );
  });

  it("falls back to domain substring match", () => {
    expect(resolveSiteUrl("https://matcha-mignon.com", accessibleSites)).toBe(
      "sc-domain:matcha-mignon.com"
    );
  });

  it("throws when no property matches", () => {
    expect(() =>
      resolveSiteUrl("https://unknown.com/", accessibleSites)
    ).toThrow('No matching GSC property for "https://unknown.com/"');
  });
});

describe("buildGscReport", () => {
  it("builds summary and maps query/page rows", () => {
    const report = buildGscReport({
      siteUrl: "sc-domain:matcha-mignon.com",
      startDate: "2026-07-01",
      endDate: "2026-07-31",
      queryRows: [
        {
          keys: ["matcha bio"],
          clicks: 10,
          impressions: 200,
          ctr: 0.05,
          position: 5,
        },
        {
          keys: ["thé vert"],
          clicks: 5,
          impressions: 100,
          ctr: 0.05,
          position: 7,
        },
      ],
      pageRows: [
        {
          keys: ["https://matcha-mignon.com/guide/bienfaits-matcha"],
          clicks: 8,
          impressions: 150,
          ctr: 0.053,
          position: 6,
        },
      ],
    });

    expect(report.siteUrl).toBe("sc-domain:matcha-mignon.com");
    expect(report.period).toEqual({
      startDate: "2026-07-01",
      endDate: "2026-07-31",
    });
    expect(report.summary.totalClicks).toBe(15);
    expect(report.summary.totalImpressions).toBe(300);
    expect(report.summary.averageCtr).toBeCloseTo(0.05);
    expect(report.summary.averagePosition).toBe(6);
    expect(report.topQueries).toHaveLength(2);
    expect(report.topQueries[0]).toEqual({
      query: "matcha bio",
      clicks: 10,
      impressions: 200,
      ctr: 0.05,
      position: 5,
    });
    expect(report.topPages[0]?.page).toBe(
      "https://matcha-mignon.com/guide/bienfaits-matcha"
    );
    expect(report.generatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it("returns zeroed summary for empty data", () => {
    const report = buildGscReport({
      siteUrl: "sc-domain:matcha-mignon.com",
      startDate: "2026-07-01",
      endDate: "2026-07-31",
      queryRows: [],
      pageRows: [],
    });

    expect(report.summary).toEqual({
      totalClicks: 0,
      totalImpressions: 0,
      averageCtr: 0,
      averagePosition: 0,
    });
    expect(report.opportunities).toEqual([]);
  });

  it("detects low CTR and striking distance opportunities", () => {
    const report = buildGscReport({
      siteUrl: "sc-domain:matcha-mignon.com",
      startDate: "2026-07-01",
      endDate: "2026-07-31",
      queryRows: [
        {
          keys: ["matcha latte"],
          clicks: 1,
          impressions: 80,
          ctr: 0.0125,
          position: 12,
        },
        {
          keys: ["matcha"],
          clicks: 20,
          impressions: 150,
          ctr: 0.13,
          position: 4,
        },
      ],
      pageRows: [],
    });

    const types = report.opportunities.map((item) => item.type);

    expect(types).toContain("low_ctr");
    expect(types).toContain("striking_distance");
    expect(types).toContain("high_impressions");
    expect(report.opportunities[0]?.impressions).toBeGreaterThanOrEqual(
      report.opportunities[1]?.impressions ?? 0
    );
  });

  it("limits opportunities to 15 items", () => {
    const queryRows = Array.from({ length: 20 }, (_, index) => ({
      keys: [`query ${index}`],
      clicks: 0,
      impressions: 120,
      ctr: 0.01,
      position: 10,
    }));

    const report = buildGscReport({
      siteUrl: "sc-domain:matcha-mignon.com",
      startDate: "2026-07-01",
      endDate: "2026-07-31",
      queryRows,
      pageRows: [],
    });

    expect(report.opportunities.length).toBeLessThanOrEqual(15);
  });
});
