import { createClient } from "contentful";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUTPUT_PATH = path.join(
  import.meta.dirname,
  "output",
  "contentfulAssetsAudit.json"
);

function getEnvVar(key: string) {
  const value = process.env[key];
  if (!value) throw new Error(`[Error] getEnvVar: ${key} is required.`);
  return value;
}

const client = createClient({
  space: getEnvVar("CONTENTFUL_SPACE_ID"),
  environment: getEnvVar("CONTENTFUL_ENVIRONMENT"),
  accessToken: getEnvVar("CONTENTFUL_DELIVERY_API_KEY"),
});

const PAGE_SIZE = 100;

async function fetchAllAssets() {
  const assets = [];
  let skip = 0;
  let total = Infinity;

  while (skip < total) {
    const response = await client.getAssets({ skip, limit: PAGE_SIZE });
    total = response.total;
    assets.push(...response.items);
    skip += PAGE_SIZE;
  }

  return assets;
}

function toNonEmptyString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0
    ? value
    : undefined;
}

async function main() {
  const rawAssets = await fetchAllAssets();

  const assets = rawAssets.map((asset) => {
    const title = toNonEmptyString(asset.fields.title);
    const description = toNonEmptyString(asset.fields.description);

    return {
      id: asset.sys.id,
      title,
      description,
      fileName: asset.fields.file?.fileName ?? undefined,
      alt: title || description || undefined,
    };
  });

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, JSON.stringify({ assets }, null, 2));
  console.log(`Written to ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
