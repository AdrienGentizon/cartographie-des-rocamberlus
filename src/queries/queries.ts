import { gql } from '@apollo/client';

export const GET_LOCATIONS = gql`
  query getLocations($page: Int, $size: Int) {
    locations(page: $page, size: $size) {
      locations {
        id
        name
        address {
          country
          city
          zipcode
          street_name
          street_number
          gps_longitude
          gps_latitude
        }
        description
      }
      pagination {
        total
        previous
        current
        next
      }
    }
  }
`;

export const GET_LOCATION = gql`
  query location($id: ID!) {
    location(id: $id) {
      id
      name
      address {
        country
        city
        zipcode
        street_name
        street_number
        gps_longitude
        gps_latitude
      }
    }
  }
`;
