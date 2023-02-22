import { gql, useQuery } from '@apollo/client'

const HomePageFramgent = gql`
  fragment HomePageFragment on HomePage {
    title
    mainTextTitle
    mainText {
      json
    }
  }
`

const GET_HOME_PAGE_QUERY = gql`
  ${HomePageFramgent}
  query getHomePage {
    homePage(id: "74SXJsnKRJX9IFN1830JaM") {
      ...HomePageFragment
    }
  }
`

export default function useHomePage() {
  return useQuery(GET_HOME_PAGE_QUERY)
}
