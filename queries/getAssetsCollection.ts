import env from "@/utils/env";
import getContentfulGraphqlQueryHeaders from "@/utils/getContentfulGraphqlQueryHeaders";
import { ContentfulAsset } from "@/utils/types";

const GET_ASSETS_QUERY = `
  query AssetsCollection($ids: [String!]!) {
    assetCollection(where: { sys: { id_in: $ids } }) {
      items {
        sys {
          id
        }
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
    }
  }
`;

export default async function getAssetsCollection(
  ids: string[]
): Promise<ContentfulAsset[]> {
  if (ids.length === 0) return [];

  try {
    const response = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${env().CONTENTFUL_SPACE_ID}`,
      {
        method: "POST",
        headers: getContentfulGraphqlQueryHeaders(),
        body: JSON.stringify({
          query: GET_ASSETS_QUERY,
          variables: { ids },
        }),
        next: { tags: ["assetCollection"] },
      }
    );

    const { data } = (await response.json()) as {
      data?: {
        assetCollection: {
          items: Array<Omit<ContentfulAsset, "sys"> & { sys: { id: string } }>;
        };
      };
    };

    if (!data?.assetCollection?.items) return [];

    return data.assetCollection.items.map((item) => ({
      ...item,
      sys: { ...item.sys, __typename: "Sys" as const },
    }));
  } catch (error) {
    console.error("[ERROR:CONTENTFUL] getAssetsCollection", error);
    return [];
  }
}
