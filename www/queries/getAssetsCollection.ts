import { ASSET_TAG, fetchContentfulGraphQL } from "@/utils/contentful";
import { ContentfulAsset } from "@/utils/types";

const ASSET_COLLECTION_TAG = "assetCollection";

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

type QueriedAsset = Omit<ContentfulAsset, "sys"> & { sys: { id: string } };

function toContentfulAsset(item: QueriedAsset): ContentfulAsset {
  return { ...item, sys: { ...item.sys, __typename: "Sys" } };
}

export default async function getAssetsCollection(
  ids: string[]
): Promise<ContentfulAsset[]> {
  if (ids.length === 0) return [];

  const { data } = await fetchContentfulGraphQL<{
    assetCollection: { items: QueriedAsset[] };
  }>({
    query: GET_ASSETS_QUERY,
    variables: { ids },
    tags: [ASSET_COLLECTION_TAG, ASSET_TAG],
  });

  return (data?.assetCollection?.items ?? []).map(toContentfulAsset);
}
