import convertErrorFromUnknownType from "../utils/convertErrorFromUnknownType";
import getContentfulGraphqlQueryHeaders from "../utils/getContentfulGraphqlQueryHeaders";
import { ContentfulLocation } from "../utils/types";

const GET_LOCATIONS_QUERY = `
  query {
    articleCollection {
      items {
        sys {
          id
        }
        title
        taggedAsNew
        locationName
        locationDescription
        locationCategory
        locationCountry
        locationZipcode
        locationCityName
        locationStreetName
        locationGpsCoordinates {
          lat
          lon
        }
        showFullAddress
        visitDate
        locationPicture {
          sys {
            id
          }
          url
        }
      }
    }
  }
`;

export default async function getLocations(): Promise<{
  locations: ContentfulLocation[];
  error?: Error;
}> {
  try {
    const response = await fetch(
      `${process.env.CONTENTFUL_GRAPHQL_ENDPOINT}/${process.env.CONTENTFUL_SPACE_ID}`,
      {
        method: "POST",
        headers: getContentfulGraphqlQueryHeaders(),
        body: JSON.stringify({ query: GET_LOCATIONS_QUERY }),
        next: { tags: ["articleCollection"] },
      }
    );
    const { data } = (await response.json()) as unknown as {
      data?: {
        articleCollection: {
          items: ContentfulLocation[];
        };
      };
    };

    return {
      locations: data?.articleCollection?.items ?? [],
      error: undefined,
    };
  } catch (error) {
    console.error(convertErrorFromUnknownType(error, `[Error] getLocations`));
    return {
      locations: [],
      error: convertErrorFromUnknownType(error, `[Error] getLocations`),
    };
  }
}
