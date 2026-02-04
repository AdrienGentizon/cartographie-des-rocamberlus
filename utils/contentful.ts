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

export async function fetchCollectionGraphQL<T>(
  tag: CollectionTag,
  query: string,
  revalidate?: number
) {
  try {
    const response = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${env().CONTENTFUL_DELIVERY_API_KEY}`,
        },
        body: JSON.stringify({ query }),
        cache: "force-cache",
        next: { tags: [tag], revalidate },
      }
    );
    return response.json() as Promise<CollectionData<typeof tag, T>>;
  } catch (error) {
    console.error(
      "[ERROR:CONTENTFUL]",
      (error as Error)?.message ?? "unknown error"
    );
    return undefined;
  }
}

export async function fetchEntryGraphQL<T>(
  tag: {
    key: EntryContentType;
    id: string;
  },
  query: string,
  variables?: Record<string, unknown>
) {
  try {
    const response = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${env().CONTENTFUL_DELIVERY_API_KEY}`,
        },
        body: JSON.stringify({ query, variables }),
        cache: "force-cache",
        next: { tags: [`${tag.key}-${tag.id}` satisfies EntryTag] },
      }
    );
    return response.json() as Promise<EntryData<typeof tag.key, T>>;
  } catch (error) {
    console.error(
      "[ERROR:CONTENTFUL]",
      (error as Error)?.message ?? "unknown error"
    );
    return undefined;
  }
}
