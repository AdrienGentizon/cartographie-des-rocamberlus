import { ASSET_TAG, fetchContentfulGraphQL } from "../utils/contentful";
import convertErrorFromUnknownType from "../utils/convertErrorFromUnknownType";
import { ContentfulLocation } from "../utils/types";

const GET_LOCATIONS_QUERY = `
  query {
    articleCollection(limit: 1000) {
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
    const { data } = await fetchContentfulGraphQL<{
      articleCollection: { items: ContentfulLocation[] };
    }>({
      query: GET_LOCATIONS_QUERY,
      tags: ["articleCollection", ASSET_TAG],
    });

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
