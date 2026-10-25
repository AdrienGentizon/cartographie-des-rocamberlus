import { BLOCKS } from "@contentful/rich-text-types";

import { ValidArticle } from "./types";

export function findFirstEmbeddedAssetId(article: ValidArticle) {
  const firstEmbeddedAsset = article.articleText.json.content.find(
    (node) => node.nodeType === BLOCKS.EMBEDDED_ASSET
  );
  return firstEmbeddedAsset?.data.target.sys.id as string | undefined;
}
