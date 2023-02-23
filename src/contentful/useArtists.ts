import { ApolloError, gql, useQuery } from '@apollo/client'
import { ArtistsHookType } from '../types'

const GET_ARTICLES_QUERY = gql`
  query getArtists {
    articleCollection {
      items {
        sys {
          id
        }
        artistName
      }
    }
  }
`

interface ItemType {
  sys: {
    id: string
  }
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
      }))
      .filter(({ artistName }: ItemType) => artistName !== null),
    loading,
    error,
  }
}
