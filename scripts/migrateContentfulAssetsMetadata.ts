import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const OUTPUT_DIR = path.join(import.meta.dirname, "output");
const PREVIEW_PATH = path.join(
  OUTPUT_DIR,
  "contentfulAssetsMigrationPreview.json"
);
const REQUEST_INTERVAL_MS = 200;
const MAX_RATE_LIMIT_RETRIES = 5;

type PreviewEntry = {
  id: string;
  current: { title?: string | null; description?: string | null };
  migrated: { caption: string | null; attribution: string | null };
  rule: string;
};

const SKIPPED_RULES = ["site-decorative", "empty"];
const UNTITLED_ASSET_TITLE = "untitled";

type LocalizedField = Record<string, string>;

type CmaAsset = {
  sys: { id: string; version: number; publishedVersion?: number };
  fields: {
    title?: LocalizedField;
    description?: LocalizedField;
    [key: string]: unknown;
  };
};

type AssetSnapshot = {
  id: string;
  version: number;
  wasPublished: boolean;
  title?: string;
  description?: string;
};

type Plan = {
  entry: PreviewEntry;
  live: CmaAsset;
  snapshot: AssetSnapshot;
};

type ReportStatus =
  | "planned"
  | "updated"
  | "skipped-live-mismatch"
  | "skipped-pending-changes"
  | "error";

type ReportLine = {
  id: string;
  status: ReportStatus;
  before: { title?: string; description?: string };
  after: { title?: string; description?: string };
  error?: string;
};

function getEnvVar(key: string) {
  const value = process.env[key];
  if (!value) throw new Error(`[Error] getEnvVar: ${key} is required.`);
  return value;
}

const SPACE_ID = getEnvVar("CONTENTFUL_SPACE_ID");
const ENVIRONMENT = getEnvVar("CONTENTFUL_ENVIRONMENT");
const MANAGEMENT_TOKEN = getEnvVar("CONTENTFUL_MANAGEMENT_TOKEN");
const BASE_URL = `https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`;

function parseArgs(argv: string[]) {
  const onlyArg = argv.find((arg) => arg.startsWith("--only="));
  return {
    apply: argv.includes("--apply"),
    onlyIds: onlyArg ? onlyArg.replace("--only=", "").split(",") : undefined,
  };
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toNonEmptyString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0
    ? value
    : undefined;
}

function toComparable(value: unknown) {
  return toNonEmptyString(value)?.trim();
}

async function cmaRequest<T>(
  pathname: string,
  init: RequestInit = {},
  attempt = 0
): Promise<T> {
  await wait(REQUEST_INTERVAL_MS);
  const response = await fetch(`${BASE_URL}${pathname}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${MANAGEMENT_TOKEN}`,
      "Content-Type": "application/vnd.contentful.management.v1+json",
      ...init.headers,
    },
  });

  if (response.status === 429 && attempt < MAX_RATE_LIMIT_RETRIES) {
    const resetSeconds = Number(
      response.headers.get("X-Contentful-RateLimit-Reset") ?? 1
    );
    await wait(resetSeconds * 1000);
    return cmaRequest<T>(pathname, init, attempt + 1);
  }

  if (!response.ok) {
    throw new Error(
      `[CMA] ${init.method ?? "GET"} ${pathname} ${response.status}: ${await response.text()}`
    );
  }

  return response.json() as Promise<T>;
}

async function getDefaultLocale() {
  const { items } = await cmaRequest<{
    items: { code: string; default: boolean }[];
  }>("/locales");
  const defaultLocale = items.find((locale) => locale.default);
  if (!defaultLocale) throw new Error("[CMA] no default locale found");
  return defaultLocale.code;
}

async function readPreviewEntries(): Promise<PreviewEntry[]> {
  const content = await readFile(PREVIEW_PATH, "utf-8");
  const { assets } = JSON.parse(content) as { assets: PreviewEntry[] };
  return assets;
}

function isMigratableRule(entry: PreviewEntry) {
  return !SKIPPED_RULES.includes(entry.rule);
}

function toTargetTitle(entry: PreviewEntry) {
  return entry.migrated.caption ?? UNTITLED_ASSET_TITLE;
}

function hasChanges(entry: PreviewEntry) {
  return (
    toComparable(entry.current.title) !== toComparable(toTargetTitle(entry)) ||
    toComparable(entry.current.description) !==
      toComparable(entry.migrated.attribution)
  );
}

function isPublishedWithoutPendingChanges(asset: CmaAsset) {
  return (
    asset.sys.publishedVersion !== undefined &&
    asset.sys.version === asset.sys.publishedVersion + 1
  );
}

function hasPendingChanges(asset: CmaAsset) {
  return (
    asset.sys.publishedVersion !== undefined &&
    asset.sys.version > asset.sys.publishedVersion + 1
  );
}

function toSnapshot(asset: CmaAsset, locale: string): AssetSnapshot {
  return {
    id: asset.sys.id,
    version: asset.sys.version,
    wasPublished: asset.sys.publishedVersion !== undefined,
    title: asset.fields.title?.[locale],
    description: asset.fields.description?.[locale],
  };
}

function liveMatchesPreview(snapshot: AssetSnapshot, entry: PreviewEntry) {
  return (
    toNonEmptyString(snapshot.title) ===
      toNonEmptyString(entry.current.title) &&
    toNonEmptyString(snapshot.description) ===
      toNonEmptyString(entry.current.description)
  );
}

function withLocalizedValue(
  field: LocalizedField | undefined,
  locale: string,
  value: string | null
): LocalizedField | undefined {
  const { [locale]: _previous, ...otherLocales } = field ?? {};
  const next = value ? { ...otherLocales, [locale]: value } : otherLocales;
  return Object.keys(next).length > 0 ? next : undefined;
}

function toMigratedFields(
  asset: CmaAsset,
  entry: PreviewEntry,
  locale: string
): CmaAsset["fields"] {
  return {
    ...asset.fields,
    title: withLocalizedValue(asset.fields.title, locale, toTargetTitle(entry)),
    description: withLocalizedValue(
      asset.fields.description,
      locale,
      entry.migrated.attribution
    ),
  };
}

function toReportLine(
  plan: Plan,
  status: ReportStatus,
  error?: string
): ReportLine {
  return {
    id: plan.entry.id,
    status,
    before: {
      title: plan.snapshot.title,
      description: plan.snapshot.description,
    },
    after: {
      title: toTargetTitle(plan.entry),
      description: plan.entry.migrated.attribution ?? undefined,
    },
    error,
  };
}

async function buildPlan(entry: PreviewEntry, locale: string): Promise<Plan> {
  const live = await cmaRequest<CmaAsset>(`/assets/${entry.id}`);
  return { entry, live, snapshot: toSnapshot(live, locale) };
}

function getSkipStatus(plan: Plan): ReportStatus | undefined {
  if (!liveMatchesPreview(plan.snapshot, plan.entry))
    return "skipped-live-mismatch";
  if (hasPendingChanges(plan.live)) return "skipped-pending-changes";
  return undefined;
}

function assertHasTitle(fields: CmaAsset["fields"], locale: string) {
  if (!toNonEmptyString(fields.title?.[locale]))
    throw new Error(`[Migration] refusing to write an empty title (${locale})`);
}

async function applyPlan(plan: Plan, locale: string) {
  const fields = toMigratedFields(plan.live, plan.entry, locale);
  assertHasTitle(fields, locale);

  const updated = await cmaRequest<CmaAsset>(`/assets/${plan.entry.id}`, {
    method: "PUT",
    headers: { "X-Contentful-Version": String(plan.live.sys.version) },
    body: JSON.stringify({ fields }),
  });

  if (isPublishedWithoutPendingChanges(plan.live)) {
    await cmaRequest<CmaAsset>(`/assets/${plan.entry.id}/published`, {
      method: "PUT",
      headers: { "X-Contentful-Version": String(updated.sys.version) },
    });
  }
}

async function writeJson(fileName: string, data: unknown) {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const filePath = path.join(OUTPUT_DIR, fileName);
  await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  return filePath;
}

function countByStatus(lines: ReportLine[]) {
  return lines.reduce(
    (acc: Partial<Record<ReportStatus, number>>, line) => ({
      ...acc,
      [line.status]: (acc[line.status] ?? 0) + 1,
    }),
    {}
  );
}

async function main() {
  const { apply, onlyIds } = parseArgs(process.argv.slice(2));
  const runId = `${ENVIRONMENT}-${new Date().toISOString().replace(/[:.]/g, "-")}`;
  const locale = await getDefaultLocale();

  const entries = (await readPreviewEntries())
    .filter(isMigratableRule)
    .filter(hasChanges)
    .filter((entry) => !onlyIds || onlyIds.includes(entry.id));

  console.log(
    `[Migration] env=${ENVIRONMENT} locale=${locale} mode=${apply ? "APPLY" : "DRY-RUN"} assets=${entries.length}`
  );

  const plans: Plan[] = [];
  for (const entry of entries) plans.push(await buildPlan(entry, locale));

  const backupPath = await writeJson(`contentfulAssetsBackup-${runId}.json`, {
    environment: ENVIRONMENT,
    locale,
    assets: plans.map((p) => p.snapshot),
  });
  console.log(`[Migration] backup: ${backupPath}`);

  const reportLines: ReportLine[] = [];
  for (const plan of plans) {
    const skipStatus = getSkipStatus(plan);
    if (skipStatus) {
      reportLines.push(toReportLine(plan, skipStatus));
      continue;
    }
    if (!apply) {
      reportLines.push(toReportLine(plan, "planned"));
      continue;
    }
    try {
      await applyPlan(plan, locale);
      reportLines.push(toReportLine(plan, "updated"));
    } catch (error) {
      reportLines.push(
        toReportLine(plan, "error", (error as Error)?.message ?? String(error))
      );
    }
  }

  const summary = countByStatus(reportLines);
  const reportPath = await writeJson(
    `contentfulAssetsMigrationReport-${runId}.json`,
    { environment: ENVIRONMENT, locale, apply, summary, assets: reportLines }
  );
  console.log(`[Migration] report: ${reportPath}`);
  console.log(`[Migration] summary: ${JSON.stringify(summary)}`);
}

main();
