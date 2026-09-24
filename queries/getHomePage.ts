import { ASSET_TAG, fetchContentfulGraphQL } from "../utils/contentful";
import convertErrorFromUnknownType from "../utils/convertErrorFromUnknownType";
import { PAGES } from "../utils/entriesIds";
import { HomePageType } from "../utils/types";

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
`;

export default async function getHomePage(): Promise<{
  homePage?: HomePageType;
  error?: Error;
}> {
  try {
    const { data } = await fetchContentfulGraphQL<{ homePage?: HomePageType }>({
      query: GET_HOME_PAGE_QUERY,
      variables: { id: PAGES.home },
      tags: ["homePage", ASSET_TAG],
    });

    return {
      homePage: data?.homePage,
      error: undefined,
    };
  } catch (error) {
    console.error(convertErrorFromUnknownType(error, `[Error] getHomePage`));
    return {
      error: convertErrorFromUnknownType(error, `[Error] getHomePage`),
    };
  }
}
