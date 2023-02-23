import { ApolloError, gql, useQuery } from '@apollo/client'
import { PictureFragment } from './ContentfulFragments'

const ArticleFragment = gql`
  ${PictureFragment}
  fragment ArticleFragment on Article {
    title
    coverPicture {
      ...PictureFragment
    }
    artistName
    artistPseudo
    artistBirthDate
    artistPseudo
    artistDeathDate
    artistDescription
    artistPicture {
      url
    }
    articleText {
      json
    }
    articleAuthor
    articleUrlSource
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

export default function useArticleFromId(id: string): {
  article:
    | {
        articleAuthor: string | null
        articleText: {
          json: {
            content: any
          }
        } | null
        articleUrlSource: string | null
        artistBirthDate: string | null
        artistDescription: string | null
        artistName: string | null
        artistPicture: { url: string } | null
        artistPseudo: string | null
        coverPicture: string | null
        title: string | null
      }
    | undefined
  loading: boolean
  error: ApolloError | undefined
} {
  const { data, loading, error } = useQuery(GET_ARTICLE_FORM_ID_QUERY, {
    variables: {
      id,
    },
  })
  return { article: data?.article, loading, error }
}
