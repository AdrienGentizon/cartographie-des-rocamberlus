import { ArtistsHookType, SearchResult } from "@/utils/types";

import getArtists from "./getArtists";

const getResultName = ({ artistName, articleTitle }: ArtistsHookType) => {
  if (!articleTitle && artistName) return `${artistName}`;
  if (articleTitle && !artistName) return `${articleTitle}`;
  if (articleTitle && artistName) return `${artistName} - ${articleTitle}`;
  return undefined;
};
const computeResultName = (
  artist: ArtistsHookType
): SearchResult | undefined => {
  const name = getResultName(artist);
  if (!name) return undefined;
  return {
    name,
    articleId: artist.articleId,
  };
};
const filteroutUnnamedResult = (
  a: SearchResult | undefined
): a is SearchResult => a !== undefined;

const filterResultNameMatchingSearch =
  (searchValue: string) =>
  ({ name }: SearchResult) =>
    name?.toLowerCase().includes(searchValue.toLowerCase());

const sortByName = ({ name: a }: SearchResult, { name: b }: SearchResult) =>
  a.toUpperCase().localeCompare(b.toUpperCase());

export default async function searchSimilarArtists(q: string) {
  return (await getArtists()).artists
    .map(computeResultName)
    .filter(filteroutUnnamedResult)
    .filter(filterResultNameMatchingSearch(q))
    .toSorted(sortByName);
}
