import contentful from "@/utils/contentful";
import { getContentfulAssetFromAssetFile } from "@/utils/getContentfulAssetFromAssetFile";
import { ContentfulAsset } from "@/utils/types";

export default async function getAssetsCollection(ids: string[]) {
  const res = await contentful().getAssets({
    "sys.id[in]": ids,
  });

  return res.items.reduce((acc: ContentfulAsset[], item) => {
    const asset = getContentfulAssetFromAssetFile(item);
    if (!asset) return acc;
    return [...acc, asset];
  }, []);
}
