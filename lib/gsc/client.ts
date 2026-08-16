import { google, type searchconsole_v1 } from "googleapis";
import { parseServiceAccountCredentials } from "./credentials";

const GSC_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

export function createSearchConsoleClient() {
  const credentials = parseServiceAccountCredentials();

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: [GSC_SCOPE],
  });

  return google.searchconsole({ version: "v1", auth });
}

export async function listAccessibleSites(
  client: searchconsole_v1.Searchconsole
) {
  const response = await client.sites.list();
  return response.data.siteEntry ?? [];
}

export async function querySearchAnalytics(
  client: searchconsole_v1.Searchconsole,
  siteUrl: string,
  startDate: string,
  endDate: string,
  dimensions: string[],
  rowLimit = 25
) {
  const response = await client.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate,
      endDate,
      dimensions,
      rowLimit,
    },
  });

  return response.data.rows ?? [];
}

export function resolveSiteUrl(
  configuredSiteUrl: string,
  accessibleSites: Array<{ siteUrl?: string | null }>
) {
  const normalizedConfigured = configuredSiteUrl.replace(/\/$/, "");
  const candidates = accessibleSites
    .map((site) => site.siteUrl)
    .filter((siteUrl): siteUrl is string => Boolean(siteUrl));

  const exactMatch = candidates.find((siteUrl) => {
    const normalized = siteUrl.replace(/\/$/, "");
    return (
      normalized === normalizedConfigured ||
      normalized ===
        `sc-domain:${normalizedConfigured.replace(/^https?:\/\//, "")}`
    );
  });

  if (exactMatch) {
    return exactMatch;
  }

  const domain = normalizedConfigured.replace(/^https?:\/\//, "");
  const domainMatch = candidates.find((siteUrl) => siteUrl.includes(domain));

  if (domainMatch) {
    return domainMatch;
  }

  throw new Error(
    `No matching GSC property for "${configuredSiteUrl}". Accessible sites: ${
      candidates.join(", ") || "none"
    }`
  );
}
