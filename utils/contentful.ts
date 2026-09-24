import { ContentfulClientApi, createClient } from "contentful";

import env from "./env";

let client: undefined | ContentfulClientApi<undefined> = undefined;

export default function contentful() {
  if (!client) {
    client = createClient({
      space: env().CONTENTFUL_SPACE_ID,
      environment: env().CONTENTFUL_ENVIRONMENT,
      accessToken: env().CONTENTFUL_DELIVERY_API_KEY,
    });
  }
  return client;
}

type EntryContentType = "article";
export type EntryTag = `${EntryContentType}-${string}`;
export type CollectionTag = `${EntryContentType}Collection`;
export const ASSET_TAG = "asset";

type CollectionData<K extends CollectionTag, T = unknown> = {
  data?: Record<
    K,
    {
      items: T[];
    }
  >;
};

type EntryData<K extends EntryContentType, T = unknown> = {
  data?: Record<K, T>;
};

type GraphQLError = { message: string };

type GraphQLResponse<T> = {
  data?: T;
  errors?: GraphQLError[];
};

const MAX_RATE_LIMIT_RETRIES = 3;
const DEFAULT_RATE_LIMIT_RESET_SECONDS = 1;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRateLimitResetMs(response: Response) {
  const resetSeconds = Number(
    response.headers.get("X-Contentful-RateLimit-Reset") ??
      DEFAULT_RATE_LIMIT_RESET_SECONDS
  );
  return resetSeconds * 1000;
}

function toGraphQLErrorMessage(errors: GraphQLError[]) {
  return errors.map(({ message }) => message).join(" | ");
}

export async function fetchContentfulGraphQL<T>(
  {
    query,
    variables,
    tags,
    revalidate,
  }: {
    query: string;
    variables?: Record<string, unknown>;
    tags: string[];
    revalidate?: number;
  },
  attempt = 0
): Promise<GraphQLResponse<T>> {
  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${env().CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env().CONTENTFUL_DELIVERY_API_KEY}`,
      },
      body: JSON.stringify({ query, variables }),
      cache: "force-cache",
      next: { tags, revalidate },
    }
  );

  if (response.status === 429 && attempt < MAX_RATE_LIMIT_RETRIES) {
    await wait(getRateLimitResetMs(response));
    return fetchContentfulGraphQL<T>(
      { query, variables, tags, revalidate },
      attempt + 1
    );
  }

  if (!response.ok) {
    throw new Error(
      `[ERROR:CONTENTFUL] ${response.status} ${response.statusText}`
    );
  }

  const json = (await response.json()) as GraphQLResponse<T>;
  const errors = json.errors ?? [];

  if (errors.length > 0 && !json.data) {
    throw new Error(`[ERROR:CONTENTFUL] ${toGraphQLErrorMessage(errors)}`);
  }

  if (errors.length > 0) {
    console.warn(`[WARN:CONTENTFUL] ${toGraphQLErrorMessage(errors)}`);
  }

  return json;
}

export async function fetchCollectionGraphQL<T>(
  tag: CollectionTag,
  query: string,
  revalidate?: number
) {
  return fetchContentfulGraphQL<CollectionData<typeof tag, T>["data"]>({
    query,
    tags: [tag],
    revalidate,
  }) as Promise<CollectionData<typeof tag, T>>;
}

export async function fetchEntryGraphQL<T>(
  tag: {
    key: EntryContentType;
    id: string;
  },
  query: string,
  variables?: Record<string, unknown>
) {
  return fetchContentfulGraphQL<EntryData<typeof tag.key, T>["data"]>({
    query,
    variables,
    tags: [`${tag.key}-${tag.id}` satisfies EntryTag, ASSET_TAG],
  }) as Promise<EntryData<typeof tag.key, T>>;
}
