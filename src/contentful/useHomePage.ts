import { ApolloError, gql, useQuery } from '@apollo/client'
import { HomePageType } from '../types'

const HomePageFramgent = gql`
  fragment HomePageFragment on HomePage {
    title
    mainTextTitle
    mainText {
      json
    }
    mainTitlePicture {
      url
    }
    subTitlePicture {
      url
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

export default function useHomePage(): {
  homePage?: HomePageType
  loading: boolean
  error?: ApolloError
} {
  const { data, loading, error } = useQuery<{ homePage?: HomePageType }>(
    GET_HOME_PAGE_QUERY
  )

  return { homePage: data?.homePage, loading, error }
}
