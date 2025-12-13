import { Article, ValidArticle } from "../types";
import { fetchEntryGraphQL } from "../utils/contentful";
import convertErrorFromUnknownType from "../utils/convertErrorFromUnknownType";

function isValidArticle(
  article: Article | null | undefined
): article is ValidArticle {
  return article?.articleText !== undefined && article?.articleText !== null;
}

export default async function getArticleFromId(id: string): Promise<{
  article?: ValidArticle;
  error?: Error;
  draft?: boolean;
}> {
  try {
    const response = await fetchEntryGraphQL<ValidArticle>(
      `article`,
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
          artistPseudo
          artistDeathDate
          artistDescription
          artistPicture {
            sys {
              id
            }
            url
            title
            description
          }
          articleText {
            json
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

    return {
      article: isValidArticle(response?.data?.article)
        ? response.data.article
        : undefined,
      error: undefined,
      draft: !response?.data?.article?.articleText,
    };
  } catch (error) {
    console.error(
      convertErrorFromUnknownType(error, `[Error] getArticleFromId: ${id}`)
    );
    return {
      error: convertErrorFromUnknownType(
        error,
        `[Error] getArticleFromId: ${id}`
      ),
    };
  }
}
