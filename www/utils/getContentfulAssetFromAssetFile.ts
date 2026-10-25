import { Asset } from "contentful";

import { ContentfulAsset } from "./types";

export function getContentfulAssetFromAssetFile(
  item: Asset<undefined, string>
) {
  if (!item.fields.file) return undefined;
  return {
    contentType: item.fields.file.contentType,
    description: item.fields.title ?? "",
    fileName: item.fields.file?.fileName,
    height: item.fields.file.details.image?.height ?? 0,
    width: item.fields.file.details.image?.width ?? 0,
    size: item.fields.file.details.size,
    sys: {
      __typename: "Sys",
      id: item.sys.id,
    },
    title: item.fields.title ?? "",
    url: `https:${item.fields.file?.url}`,
  } satisfies ContentfulAsset;
}
