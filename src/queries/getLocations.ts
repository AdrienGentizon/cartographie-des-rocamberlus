import getContentfulGraphqlQueryHeaders from '@/utils/getContentfulGraphqlQueryHeaders'
import { ContentfulLocation } from '../types'
import convertErrorFromUnknownType from '@/utils/convertErrorFromUnknownType'

const GET_LOCATIONS_QUERY = `
  query {
    articleCollection {
      items {
        sys {
          id
        }
        title
        taggedAsNew
        locationName
        locationDescription
        locationCategory
        locationCountry
        locationZipcode
        locationCityName
        locationStreetName
        locationGpsCoordinates {
          lat
          lon
        }
        showFullAddress
        visitDate
        locationPicture {
          sys {
            id
          }
          url
        }
      }
    }
  }
`

export default async function getLocations(): Promise<{
  locations: ContentfulLocation[]
  error?: Error
}> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CONTENTFUL_GRAPHQL_ENDPOINT}/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`,
      {
        method: 'POST',
        headers: getContentfulGraphqlQueryHeaders(),
        body: JSON.stringify({ query: GET_LOCATIONS_QUERY }),
        cache: 'no-cache',
      }
    )
    const { data } = (await response.json()) as unknown as {
      data?: {
        articleCollection: {
          items: ContentfulLocation[]
        }
      }
    }

    return {
      locations: data?.articleCollection?.items ?? [],
      error: undefined,
    }
  } catch (error) {
    console.error(convertErrorFromUnknownType(error, `[Error] getLocations`))
    return {
      locations: [],
      error: convertErrorFromUnknownType(error, `[Error] getLocations`),
    }
  }
}
