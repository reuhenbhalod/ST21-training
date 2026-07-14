// ==========================================================================
// costs.js — AWS Cost Explorer (CE) fetch + shaping for the admin cost
// dashboard.
//
// Returns the AWS hosting cost for THIS project only, isolated by the
// cost-allocation tag Project=smartek21-academy (the account is shared with
// other projects, so the tag filter is what scopes the numbers to ST21).
//
// CE is metered ($0.01 per GetCostAndUsage call), slow (~1-2s), and only
// refreshes a few times a day — so callers front this with the DynamoDB cache
// (getCachedCosts/putCachedCosts). This module just fetches + shapes; the
// handler owns auth, caching, and the fail-soft (503) policy.
//
// CE lives ONLY in us-east-1, so the client is pinned there regardless of the
// Lambda's region.
// ==========================================================================

import {
  CostExplorerClient,
  GetCostAndUsageCommand,
} from "@aws-sdk/client-cost-explorer";

let _ce = null;
function ce() {
  // CE has a single global endpoint in us-east-1 — pin it, don't inherit the
  // Lambda region. Lazy-init mirrors bedrock() in chat.js and doc() in db.js.
  if (!_ce) _ce = new CostExplorerClient({ region: "us-east-1" });
  return _ce;
}

const PROJECT_TAG = { Key: "Project", Values: ["smartek21-academy"] };

// Server-side whitelist of allowed time ranges. Exported so the handler can
// reject unknown ranges (400) without duplicating the list.
export const RANGES = { mtd: "mtd", last30d: "last30d" };

// Cache-buster for the shaped payload. Bump whenever fetchCosts's output changes
// — shape OR computed values (e.g. rounding precision) — so previously cached
// payloads are ignored instead of served stale. The cost cache key embeds it
// (see getCachedCosts/putCachedCosts). "3" = 6-decimal unfiltered breakdown +
// rolling 14-day daily trend.
export const CACHE_VERSION = "3";

const DAY_MS = 24 * 60 * 60 * 1000;
const ymd = (d) => d.toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
const TREND_DAYS = 14; // rolling daily-trend window: today + the preceding 13 days
// Round to 6 decimal places (millionths of a dollar). Tagged project spend is
// currently sub-cent — some services (CloudFront) cost millionths — so rounding
// to whole cents floored them to $0.00. 6 dp lets every service that accrues
// any cost render a non-zero figure. Larger figures are unaffected.
const round6 = (n) => Math.round(n * 1e6) / 1e6;

// Resolve a range to a CE TimePeriod. CE's End is EXCLUSIVE, so it is always
// "tomorrow" (UTC) to include everything through today. Throws on an unknown
// range BEFORE any CE call is made.
export function resolveRange(range, now = new Date()) {
  if (!RANGES[range]) throw new Error(`invalid range: ${range}`);
  const end = ymd(new Date(now.getTime() + DAY_MS)); // exclusive upper bound
  let start;
  if (range === "mtd") {
    // First day of the current month (UTC).
    start = ymd(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)));
  } else {
    // last30d: today and the preceding 29 days.
    start = ymd(new Date(now.getTime() - 29 * DAY_MS));
  }
  return { start, end };
}

// Fetch + shape the cost payload for a range. Returns the contract WITHOUT the
// `cached` flag (the handler adds it). Throws on any CE/SDK error — the handler
// catches and returns 503. An empty CE result (e.g. tag data not yet populated)
// is a valid all-zero payload, NOT an error.
export async function fetchCosts(range, now = new Date()) {
  const { start, end } = resolveRange(range, now);
  const common = {
    Metrics: ["UnblendedCost"],
    Filter: { Tags: PROJECT_TAG },
  };

  // 1. Per-service breakdown + total, over the requested range (month-to-date).
  //    MONTHLY may return one period (mtd) or two (a range crossing a month
  //    boundary), so we aggregate across all periods below.
  const breakdown = await ce().send(
    new GetCostAndUsageCommand({
      ...common,
      TimePeriod: { Start: start, End: end },
      Granularity: "MONTHLY",
      GroupBy: [{ Type: "DIMENSION", Key: "SERVICE" }],
    })
  );

  // 2. Daily trend over a FIXED trailing window (last TREND_DAYS days incl.
  //    today), deliberately independent of the range above so the chart is
  //    always a rolling ~2 weeks regardless of where we are in the month. No
  //    GroupBy — the amount lives in each period's Total.
  const trendStart = ymd(new Date(now.getTime() - (TREND_DAYS - 1) * DAY_MS));
  const trendEnd = ymd(new Date(now.getTime() + DAY_MS)); // exclusive upper bound
  const daily = await ce().send(
    new GetCostAndUsageCommand({
      ...common,
      TimePeriod: { Start: trendStart, End: trendEnd },
      Granularity: "DAILY",
    })
  );

  let currency = "USD";
  const byServiceRaw = new Map();
  for (const period of breakdown.ResultsByTime || []) {
    for (const g of period.Groups || []) {
      const metric = g.Metrics?.UnblendedCost;
      if (!metric) continue;
      if (metric.Unit) currency = metric.Unit;
      const service = g.Keys?.[0] || "Unknown";
      byServiceRaw.set(service, (byServiceRaw.get(service) || 0) + Number(metric.Amount || 0));
    }
  }

  // Every service the tag touches, largest first. No filtering: the user wants
  // every piece of the app that accrues any cost shown — even fractions of a
  // cent, and $0 free-tier services like Lambda — so nothing is dropped here.
  const byService = [...byServiceRaw.entries()]
    .map(([service, amount]) => ({ service, amount: round6(amount) }))
    .sort((a, b) => b.amount - a.amount);

  // Total from the RAW per-service amounts, rounding only once at the end, so
  // many tiny services still add up to an accurate figure instead of each
  // rounding away first.
  const total = round6(
    [...byServiceRaw.values()].reduce((sum, amount) => sum + amount, 0)
  );

  const trend = (daily.ResultsByTime || [])
    .map((period) => {
      const metric = period.Total?.UnblendedCost;
      if (metric?.Unit) currency = metric.Unit;
      return {
        date: period.TimePeriod?.Start,
        amount: round6(Number(metric?.Amount || 0)),
      };
    })
    .filter((t) => t.date)
    .sort((a, b) => a.date.localeCompare(b.date));

  return {
    range,
    currency,
    total,
    byService,
    trend,
    asOf: now.toISOString(),
  };
}
