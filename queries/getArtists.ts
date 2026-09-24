import { fetchCollectionGraphQL } from "../utils/contentful";
import convertErrorFromUnknownType from "../utils/convertErrorFromUnknownType";
import { ArtistsHookType } from "../utils/types";

export default async function getArtists(): Promise<{
  artists: ArtistsHookType[];
  error?: Error;
}> {
  try {
    const artists = await fetchCollectionGraphQL<{
      sys: { id: string; publishedAt: string };
      title: string | null;
      artistName: string | null;
    }>(
      `articleCollection`,
      `query artists {
        articleCollection(limit: 1000, where: { articleText_exists: true }) {
          items {
            sys {
              id
              publishedAt
            }
            title
            artistName
          }
        }
      }`
    );

    return {
      artists: (artists?.data?.articleCollection.items ?? []).reduce(
        (acc: ArtistsHookType[], curr) => {
          if (!curr.title) return acc;
          const handle = curr.artistName ?? curr.title;
          if (!handle) return acc;
          return [
            ...acc,
            {
              articleId: curr.sys.id,
              articleTitle: curr.title,
              artistName: handle,
              publishedAt: curr.sys.publishedAt,
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
