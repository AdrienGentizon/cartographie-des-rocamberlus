import { gql, QueryResult, useQuery } from "@apollo/client";
import { PictureFragment } from "./ContentfulFragments";

const GET_IMAGE_FORM_ID_QUERY = gql`
  ${PictureFragment}
  query getAssetFromId($id: String!) {
    asset(id: $id) {
      ...PictureFragment
    }
  }
`;

export default function useImageFromId(id?: string): QueryResult<{
  asset: {
    sys: { id: string };
    url: string;

    __typename: "Asset";
  };
}> {
  return useQuery(GET_IMAGE_FORM_ID_QUERY, { variables: { id } });
}
