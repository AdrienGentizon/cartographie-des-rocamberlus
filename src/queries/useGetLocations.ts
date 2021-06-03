import { gql, QueryResult, useQuery } from '@apollo/client';
import { GqlLocation, Pagination } from '../types';

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

export default function useGetLocations(variables?: {
  page: number;
  size: number;
}): QueryResult<{
  locations: {
    locations: GqlLocation[];
    pagination: Pagination;
  };
}> {
  return useQuery(GET_LOCATIONS, {
    variables: variables
      ? variables
      : {
          page: 1,
          size: 10,
        },
  });
}
