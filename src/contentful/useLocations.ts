import { gql, useQuery } from '@apollo/client'
import { PictureFragment } from './ContentfulFragments'

const LocationFragment = gql`
  ${PictureFragment}
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
      ...PictureFragment
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
