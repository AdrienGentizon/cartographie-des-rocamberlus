import { gql, useQuery } from '@apollo/client'
import { PictureFragment } from './ContentfulFragments'

const GET_IMAGE_FORM_ID_QUERY = gql`
  ${PictureFragment}
  query getAssetFromId($id: String!) {
    asset(id: $id) {
      ...PictureFragment
    }
  }
`

export default function useImageFromId(id: string) {
  return useQuery(GET_IMAGE_FORM_ID_QUERY, { variables: { id } })
}
