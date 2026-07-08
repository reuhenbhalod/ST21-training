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

const DAY_MS = 24 * 60 * 60 * 1000;
const ymd = (d) => d.toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
const cents = (n) => Math.round(n * 100) / 100;

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
  const TimePeriod = { Start: start, End: end };
  const base = {
    TimePeriod,
    Metrics: ["UnblendedCost"],
    Filter: { Tags: PROJECT_TAG },
  };

  // 1. Per-service breakdown. MONTHLY may return one period (mtd) or two
  //    (last30d crossing a month boundary), so we aggregate across all periods.
  const breakdown = await ce().send(
    new GetCostAndUsageCommand({
      ...base,
      Granularity: "MONTHLY",
      GroupBy: [{ Type: "DIMENSION", Key: "SERVICE" }],
    })
  );

  // 2. Daily trend. No GroupBy — the amount lives in each period's Total.
  const daily = await ce().send(
    new GetCostAndUsageCommand({ ...base, Granularity: "DAILY" })
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

  const byService = [...byServiceRaw.entries()]
    .map(([service, amount]) => ({ service, amount: cents(amount) }))
    .filter((s) => s.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  // Total from the rounded service amounts so the breakdown always sums to it.
  const total = cents(byService.reduce((sum, s) => sum + s.amount, 0));

  const trend = (daily.ResultsByTime || [])
    .map((period) => {
      const metric = period.Total?.UnblendedCost;
      if (metric?.Unit) currency = metric.Unit;
      return {
        date: period.TimePeriod?.Start,
        amount: cents(Number(metric?.Amount || 0)),
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
