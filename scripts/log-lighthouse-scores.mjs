#!/usr/bin/env node
/**
 * Print lab scores from LHCI JSON reports. Does not fail on low scores.
 * Exits non-zero only if reports are missing or a page returned HTTP 404.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const REPORT_DIR = ".lighthouseci";

function asLhr(data) {
  if (data && typeof data === "object" && data.categories?.performance) {
    return data;
  }
  if (data?.lhr?.categories?.performance) {
    return data.lhr;
  }
  return null;
}

function round(value, digits = 0) {
  if (typeof value !== "number" || Number.isNaN(value)) return "n/a";
  return value.toFixed(digits);
}

function ms(audit) {
  if (!audit || typeof audit.numericValue !== "number") return "n/a";
  return `${Math.round(audit.numericValue)} ms`;
}

function documentStatus(lhr) {
  const items = lhr.audits?.["network-requests"]?.details?.items ?? [];
  const main = items.find(
    (item) =>
      item.url === lhr.mainDocumentUrl || item.url === lhr.requestedUrl
  );
  return typeof main?.statusCode === "number" ? main.statusCode : null;
}

function score100(category) {
  if (typeof category?.score !== "number") return "n/a";
  return Math.round(category.score * 100);
}

const files = readdirSync(REPORT_DIR).filter(
  (name) =>
    name.endsWith(".json") &&
    !name.startsWith("manifest") &&
    !name.startsWith("assertion-results")
);

const seen = new Set();
const reports = [];

for (const file of files) {
  const raw = JSON.parse(readFileSync(join(REPORT_DIR, file), "utf8"));
  const lhr = asLhr(raw);
  if (!lhr) continue;

  const key = lhr.requestedUrl ?? lhr.finalUrl ?? file;
  if (seen.has(key)) continue;
  seen.add(key);
  reports.push(lhr);
}

if (reports.length === 0) {
  console.error(`No Lighthouse JSON reports found in ${REPORT_DIR}/`);
  process.exit(1);
}

reports.sort((a, b) =>
  String(a.requestedUrl).localeCompare(String(b.requestedUrl))
);

console.log("\n=== Lighthouse scores (mobile, 1 run, static export) ===\n");

let hadError = false;

for (const lhr of reports) {
  const url = lhr.finalDisplayedUrl ?? lhr.finalUrl ?? lhr.requestedUrl;
  const status = documentStatus(lhr);
  const inp =
    lhr.audits?.["interaction-to-next-paint"] ??
    lhr.audits?.["experimental-interaction-to-next-paint"];

  console.log(`URL: ${url}`);
  if (status != null) console.log(`  HTTP:         ${status}`);
  console.log(`  Performance:  ${score100(lhr.categories.performance)}`);
  console.log(`  LCP:          ${ms(lhr.audits?.["largest-contentful-paint"])}`);
  console.log(
    `  CLS:          ${round(lhr.audits?.["cumulative-layout-shift"]?.numericValue, 3)}`
  );
  console.log(`  TBT:          ${ms(lhr.audits?.["total-blocking-time"])}`);
  console.log(`  INP (lab):    ${inp ? ms(inp) : "n/a"}`);
  if (lhr.runtimeError?.message) {
    console.log(`  runtimeError: ${lhr.runtimeError.message}`);
    hadError = true;
  }
  if (status === 404) {
    console.log("  ERROR: document returned 404 (not a useful lab run)");
    hadError = true;
  }
  console.log("");
}

if (hadError) {
  process.exit(1);
}
