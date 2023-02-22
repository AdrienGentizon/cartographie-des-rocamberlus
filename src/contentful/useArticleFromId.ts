import { gql, useQuery } from '@apollo/client'
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

export default function useArticleFromId(id: string) {
  return useQuery(GET_ARTICLE_FORM_ID_QUERY, {
    variables: {
      id,
    },
  })
}
