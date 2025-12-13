import { ArtistsHookType } from "../types";
import { fetchCollectionGraphQL } from "../utils/contentful";
import convertErrorFromUnknownType from "../utils/convertErrorFromUnknownType";

export default async function getArtists(): Promise<{
  artists: ArtistsHookType[];
  error?: Error;
}> {
  try {
    const artists = await fetchCollectionGraphQL<{
      sys: { id: string };
      title: string | null;
      artistName: string | null;
    }>(
      `articleCollection`,
      `query artists {
        articleCollection {
          items {
            sys {
              id
            }
            title
            artistName
          }
        }
      }`
    );

    return {
      artists: (artists?.data?.articleCollection.items ?? []).reduce(
        (
          acc: {
            articleId: string;
            articleTitle: string;
            artistName: string;
          }[],
          curr
        ) => {
          if (!curr.title || !curr.artistName) return acc;
          return [
            ...acc,
            {
              articleId: curr.sys.id,
              articleTitle: curr.title,
              artistName: curr.artistName,
            },
          ];
        },
        []
      ),
      error: undefined,
    };
  } catch (error) {
    console.error(convertErrorFromUnknownType(error, `[Error] getArtists`));
    return {
      error: convertErrorFromUnknownType(error, `[Error] getArtists`),
      artists: [],
    };
  }
}
