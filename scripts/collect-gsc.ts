import { config } from "dotenv";
import fs from "fs";
import path from "path";
import { siteConfig } from "@/lib/site";
import {
  createSearchConsoleClient,
  listAccessibleSites,
  querySearchAnalytics,
  resolveSiteUrl,
} from "@/lib/gsc/client";
import { buildGscReport } from "@/lib/gsc/report";

config();

const REPORT_DIR = path.resolve("reports");
const REPORT_FILE = path.join(REPORT_DIR, "gsc-report.json");

function getDateRange(days: number) {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - days);

  const format = (date: Date) => date.toISOString().slice(0, 10);

  return {
    startDate: format(start),
    endDate: format(end),
  };
}

function printReportSummary(report: ReturnType<typeof buildGscReport>) {
  console.log("\n=== Google Search Console Report ===\n");
  console.log(`Site: ${report.siteUrl}`);
  console.log(`Period: ${report.period.startDate} → ${report.period.endDate}`);
  console.log(`Clicks: ${report.summary.totalClicks}`);
  console.log(`Impressions: ${report.summary.totalImpressions}`);
  console.log(
    `Avg CTR: ${(report.summary.averageCtr * 100).toFixed(
      2
    )}% | Avg position: ${report.summary.averagePosition.toFixed(1)}`
  );

  console.log("\n--- Top queries ---");
  for (const row of report.topQueries.slice(0, 10)) {
    console.log(
      `  ${row.query.padEnd(35)} clicks: ${String(row.clicks).padStart(
        4
      )}  imp: ${String(row.impressions).padStart(
        5
      )}  pos: ${row.position.toFixed(1)}`
    );
  }

  console.log("\n--- Opportunities ---");
  if (report.opportunities.length === 0) {
    console.log("  No opportunities detected in this period.");
  } else {
    for (const item of report.opportunities.slice(0, 5)) {
      console.log(`  [${item.type}] ${item.query} — ${item.reason}`);
    }
  }

  console.log(`\nJSON report: ${REPORT_FILE}\n`);
}

async function main() {
  const configuredSiteUrl = process.env.GSC_SITE_URL ?? `${siteConfig.url}/`;
  const { startDate, endDate } = getDateRange(28);

  const client = createSearchConsoleClient();
  const accessibleSites = await listAccessibleSites(client);
  const siteUrl = resolveSiteUrl(configuredSiteUrl, accessibleSites);

  const [queryRows, pageRows] = await Promise.all([
    querySearchAnalytics(client, siteUrl, startDate, endDate, ["query"], 50),
    querySearchAnalytics(client, siteUrl, startDate, endDate, ["page"], 25),
  ]);

  const report = buildGscReport({
    siteUrl,
    startDate,
    endDate,
    queryRows,
    pageRows,
  });

  fs.mkdirSync(REPORT_DIR, { recursive: true });
  fs.writeFileSync(REPORT_FILE, `${JSON.stringify(report, null, 2)}\n`);

  printReportSummary(report);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error("\nGSC collection failed:", message);

  if (message.includes("permission") || message.includes("403")) {
    console.error(
      "\nTip: add the service account email to Search Console:\n" +
        "  matcha-mignon@api-project-374220478453.iam.gserviceaccount.com\n"
    );
  }

  process.exit(1);
});
