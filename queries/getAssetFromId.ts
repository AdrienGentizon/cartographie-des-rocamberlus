import env from "@/utils/env";
import getContentfulGraphqlQueryHeaders from "@/utils/getContentfulGraphqlQueryHeaders";
import { ContentfulAsset } from "@/utils/types";

const GET_ASSET_QUERY = `
  query Asset($id: String!) {
    asset(id: $id) {
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
`;

export default async function getAssetFromId(
  id: string
): Promise<ContentfulAsset | undefined> {
  try {
    const response = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${env().CONTENTFUL_SPACE_ID}`,
      {
        method: "POST",
        headers: getContentfulGraphqlQueryHeaders(),
        body: JSON.stringify({
          query: GET_ASSET_QUERY,
          variables: { id },
        }),
        cache: "force-cache",
        next: { tags: [`asset-${id}`] },
      }
    );

    const { data } = (await response.json()) as {
      data?: { asset: ContentfulAsset | null };
    };

    if (!data?.asset) return undefined;

    return {
      ...data.asset,
      sys: { ...data.asset.sys, __typename: "Sys" },
    };
  } catch (error) {
    console.error("[ERROR:CONTENTFUL] getAssetFromId", error);
    return undefined;
  }
}
