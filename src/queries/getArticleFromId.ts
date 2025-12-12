import getContentfulGraphqlQueryHeaders from '@/utils/getContentfulGraphqlQueryHeaders'
import { Article, ValidArticle } from '../types'
import convertErrorFromUnknownType from '@/utils/convertErrorFromUnknownType'

const GET_ARTICLE_FORM_ID_QUERY = `
  query getArticleFromId($id: String!) {
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
  }
`

function isValidArticle(
  article: Article | null | undefined
): article is ValidArticle {
  return article?.articleText !== undefined && article?.articleText !== null
}

export default async function getArticleFromId(id: string): Promise<{
  article?: ValidArticle
  error?: Error
  draft?: boolean
}> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CONTENTFUL_GRAPHQL_ENDPOINT}/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`,
      {
        method: 'POST',
        headers: getContentfulGraphqlQueryHeaders(),
        body: JSON.stringify({
          query: GET_ARTICLE_FORM_ID_QUERY,
          variables: { id },
        }),
        cache: 'no-cache',
      }
    )
    const { data } = await response.json()
    return {
      article: isValidArticle(data?.article) ? data.article : undefined,
      error: undefined,
      draft: !data?.article?.articleText,
    }
  } catch (error) {
    console.error(
      convertErrorFromUnknownType(error, `[Error] getArticleFromId: ${id}`)
    )
    return {
      error: convertErrorFromUnknownType(
        error,
        `[Error] getArticleFromId: ${id}`
      ),
    }
  }
}
