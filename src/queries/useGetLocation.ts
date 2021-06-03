import { gql, QueryTuple, useLazyQuery } from '@apollo/client';
import { GqlLocation } from '../types';

export const GET_LOCATION = gql`
  query getLocation($id: ID!) {
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
      description
    }
  }
`;

export default function useGetLocation(
  id?: number
): QueryTuple<{ location?: GqlLocation }, { id?: number }> {
  return useLazyQuery(GET_LOCATION, { variables: {} });
}
