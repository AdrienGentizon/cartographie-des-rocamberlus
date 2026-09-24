import { fetchEntryGraphQL } from "../utils/contentful";
import convertErrorFromUnknownType from "../utils/convertErrorFromUnknownType";
import { Article, ContentfulAsset, ValidArticle } from "../utils/types";

const ASSET_FIELDS = `
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
`;

type QueriedAsset = Omit<ContentfulAsset, "sys"> & { sys: { id: string } };

type QueriedArticle = Article & {
  artistPicture?: QueriedAsset | null;
  articleText?: {
    links?: { assets?: { block?: (QueriedAsset | null)[] } };
  } | null;
};

function isValidArticle(
  article: Article | null | undefined
): article is ValidArticle {
  return article?.articleText !== undefined && article?.articleText !== null;
}

function toContentfulAsset(asset: QueriedAsset): ContentfulAsset {
  return { ...asset, sys: { ...asset.sys, __typename: "Sys" } };
}

function isQueriedAsset(asset: QueriedAsset | null): asset is QueriedAsset {
  return asset !== null;
}

function extractEmbeddedAssets(article: QueriedArticle) {
  return (article.articleText?.links?.assets?.block ?? [])
    .filter(isQueriedAsset)
    .map(toContentfulAsset);
}

function extractArtistPicture(article: QueriedArticle) {
  return article.artistPicture
    ? toContentfulAsset(article.artistPicture)
    : undefined;
}

export default async function getArticleFromId(id: string): Promise<{
  article?: ValidArticle;
  assets: ContentfulAsset[];
  artistPicture?: ContentfulAsset;
  error?: Error;
  draft?: boolean;
}> {
  try {
    const response = await fetchEntryGraphQL<QueriedArticle>(
      {
        key: "article",
        id,
      },
      `query article($id: String!) {
        article(id: $id) {
          sys {
            id
          }
          title
          coverPicture {
            sys {
              id
            }
            url
          }
          artistName
          artistPseudo
          artistBirthDate
          artistDeathDate
          artistDescription
          artistPicture {
            ${ASSET_FIELDS}
          }
          articleText {
            json
            links {
              assets {
                block {
                  ${ASSET_FIELDS}
                }
              }
            }
          }
          articleReferences {
            json
          }
          articleWebography {
            json
          }
          articleAvDocuments {
            json
          }
          articleAuthor
          articleUrlSource
          locationName
          locationGpsCoordinates {
            lat
            lon
          }
        }
      }`,
      { id }
    );

    const queriedArticle = response?.data?.article;

    return {
      article: isValidArticle(queriedArticle) ? queriedArticle : undefined,
      assets: queriedArticle ? extractEmbeddedAssets(queriedArticle) : [],
      artistPicture: queriedArticle
        ? extractArtistPicture(queriedArticle)
        : undefined,
      error: undefined,
      draft: !queriedArticle?.articleText,
    };
  } catch (error) {
    console.error(
      convertErrorFromUnknownType(error, `[Error] getArticleFromId: ${id}`)
    );
    return {
      assets: [],
      error: convertErrorFromUnknownType(
        error,
        `[Error] getArticleFromId: ${id}`
      ),
    };
  }
}
