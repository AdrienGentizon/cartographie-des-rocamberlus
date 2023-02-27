import { ApolloError, gql, useQuery } from '@apollo/client'
import { ContentfulLocation } from '../types'

const LocationFragment = gql`
  fragment LocationFragment on Article {
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
`

const GET_LOCATIONS_QUERY = gql`
  ${LocationFragment}
  query {
    articleCollection {
      items {
        sys {
          id
        }
        title
        ...LocationFragment
      }
    }
  }
`

export default function useLocations(): {
  locations: ContentfulLocation[]
  loading: boolean
  error: ApolloError | undefined
} {
  const { data, loading, error } = useQuery(GET_LOCATIONS_QUERY)
  return { locations: data?.articleCollection?.items ?? [], loading, error }
}
