import getContentfulGraphqlQueryHeaders from '@/utils/getContentfulGraphqlQueryHeaders'
import { ArtistsHookType } from '../types'
import convertErrorFromUnknownType from '@/utils/convertErrorFromUnknownType'

const GET_ARTICLES_QUERY = `
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

export default async function getArtists(): Promise<{
  artists: ArtistsHookType[]
  error?: Error
}> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CONTENTFUL_GRAPHQL_ENDPOINT}/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`,
      {
        method: 'POST',
        headers: getContentfulGraphqlQueryHeaders(),
        body: JSON.stringify({ query: GET_ARTICLES_QUERY }),
        cache: 'no-cache',
      }
    )
    const { data } = await response.json()
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
      error: undefined,
    }
  } catch (error) {
    console.error(convertErrorFromUnknownType(error, `[Error] getArtists`))
    return {
      error: convertErrorFromUnknownType(error, `[Error] getArtists`),
      artists: [],
    }
  }
}
