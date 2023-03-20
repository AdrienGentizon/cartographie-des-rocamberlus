import { ApolloError, gql, useQuery } from '@apollo/client'
import { ArtistsHookType } from '../types'

const GET_ARTICLES_QUERY = gql`
  query getArtists {
    articleCollection {
      items {
        sys {
          id
        }
        title
        artistName
      }
    }
  }
`

interface ItemType {
  sys: {
    id: string
  }
  title: string | null
  artistName: string | null
}

export default function useArtists(): {
  artists: ArtistsHookType[]
  loading: boolean
  error: ApolloError | undefined
} {
  const { data, loading, error } = useQuery(GET_ARTICLES_QUERY)
  const rawData = data?.articleCollection?.items ?? []
  return {
    artists: rawData
      .map((d: ItemType) => ({
        artistName: d.artistName,
        articleId: d.sys.id,
        articleTitle: d.title,
      }))
      .filter(
        ({ artistName, title }: ItemType) =>
          artistName !== null || title !== null
      ),
    loading,
    error,
  }
}
