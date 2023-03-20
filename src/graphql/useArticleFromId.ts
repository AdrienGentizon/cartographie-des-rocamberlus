import { ApolloError, gql, useQuery } from '@apollo/client'
import { Article, ValidArticle } from '../types'

const ArticleFragment = gql`
  fragment ArticleFragment on Article {
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
      url
      title
      description
    }
    articleText {
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
`

const GET_ARTICLE_FORM_ID_QUERY = gql`
  ${ArticleFragment}
  query getArticleFromId($id: String!) {
    article(id: $id) {
      ...ArticleFragment
    }
  }
`

function isValidArticle(
  article: Article | null | undefined
): article is ValidArticle {
  return article?.articleText !== undefined && article?.articleText !== null
}

export default function useArticleFromId(id: string): {
  article?: ValidArticle
  loading: boolean
  error?: ApolloError
  draft: boolean
} {
  const { data, loading, error } = useQuery(GET_ARTICLE_FORM_ID_QUERY, {
    variables: {
      id,
    },
  })

  return {
    article: isValidArticle(data?.article) ? data.article : undefined,
    loading,
    error,
    draft: !data?.article?.articleText,
  }
}
