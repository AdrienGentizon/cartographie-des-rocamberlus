import { gql, QueryResult, useQuery } from "@apollo/client";
import { Document } from "@contentful/rich-text-types";

const HomePageFramgent = gql`
  fragment HomePageFragment on HomePage {
    title
    mainTextTitle
    mainText {
      json
    }
  }
`;

const GET_HOME_PAGE_QUERY = gql`
  ${HomePageFramgent}
  query getHomePage {
    homePage(id: "74SXJsnKRJX9IFN1830JaM") {
      ...HomePageFragment
    }
  }
`;

export default function useHomePage(): QueryResult<{
  homePage: {
    title: string;
    mainTextTitle: string;
    mainText: {
      json: Document;
    };
    __typename: "HomePage";
  };
}> {
  return useQuery(GET_HOME_PAGE_QUERY);
}
