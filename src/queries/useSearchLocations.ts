import {
  gql,
  QueryResult,
  QueryTuple,
  useLazyQuery,
  useQuery,
} from '@apollo/client';
import { GqlLocation } from '../types';

export const SEARCH_LOCATIONS = gql`
  query searchLocations($searchQuery: String!) {
    searchLocations(searchQuery: $searchQuery) {
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
  }
`;

export default function useSearchLocations(variables?: {
  searchQuery: string;
}): QueryResult<{
  locations: GqlLocation[];
}> {
  return useQuery(SEARCH_LOCATIONS, { variables });
}

export function useLazySearchLocations(
  searchQuery?: string
): QueryTuple<{ searchLocations: GqlLocation[] }, { searchQuery?: string }> {
  return useLazyQuery(SEARCH_LOCATIONS, { variables: {} });
}
