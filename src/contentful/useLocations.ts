import { gql, useQuery } from '@apollo/client'

const LocationFragment = gql`
  fragment LocationFragment on Article {
    sys {
      id
    }
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
        ...LocationFragment
      }
    }
  }
`

export default function useLocations() {
  return useQuery(GET_LOCATIONS_QUERY)
}
