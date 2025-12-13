import contentful from "@/utils/contentful";
import { getContentfulAssetFromAssetFile } from "@/utils/getContentfulAssetFromAssetFile";

export default async function getAssetFromId(id: string) {
  const res = await contentful().getAsset(id);

  return getContentfulAssetFromAssetFile(res);
}
