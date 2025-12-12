import getContentfulGraphqlQueryHeaders from '@/utils/getContentfulGraphqlQueryHeaders'
import { HomePageType } from '../types'
import { PAGES } from '../utils/entriesIds'
import convertErrorFromUnknownType from '@/utils/convertErrorFromUnknownType'

const GET_HOME_PAGE_QUERY = `
  query homePage($id: String!) {
    homePage(id: $id) {
      title
    mainTextTitle
    mainText {
      json
    }
    mainTitlePicture {
      url
      title
      description
      width
      height
    }
    subTitlePicture {
      url
      title
      description
      width
      height
    }
    }
  }
`

export default async function getHomePage(): Promise<{
  homePage?: HomePageType
  error?: Error
}> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CONTENTFUL_GRAPHQL_ENDPOINT}/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`,
      {
        method: 'POST',
        headers: getContentfulGraphqlQueryHeaders(),
        body: JSON.stringify({
          query: GET_HOME_PAGE_QUERY,
          variables: { id: PAGES.home },
        }),
        cache: 'no-cache',
      }
    )
    const { data } = await response.json()

    return {
      homePage: data?.homePage,
      error: undefined,
    }
  } catch (error) {
    console.error(convertErrorFromUnknownType(error, `[Error] getHomePage`))
    return {
      error: convertErrorFromUnknownType(error, `[Error] getHomePage`),
    }
  }
}
