import { Metadata } from "next";

import Link from "@/components/Link/Link";
import MapPage from "@/components/Map/MapPage";
import getArtists from "@/queries/getArtists";
import { ArtistsHookType } from "@/utils/types";

import getLocations from "../../queries/getLocations";
import env from "../../utils/env";

const MAP_TITLE =
  "Carte des environnements d'art singulier | Cartographie des rocamberlus";
const MAP_DESCRIPTION =
  "Carte des environnements d'art singulier visités en France : jardins sculptés, maisons décorées et sites d'art brut, avec la liste complète des lieux.";

export const metadata: Metadata = {
  title: MAP_TITLE,
  description: MAP_DESCRIPTION,
  alternates: {
    canonical: `${env().BASE_URL}/map`,
  },
};

const LEADING_QUOTES = /^["«“'\s]+/;

async function getMapLocations() {
  const { locations, error } = await getLocations();
  return { locations, error };
}

function toSortableTitle(title: string) {
  return title.replace(LEADING_QUOTES, "");
}

function byTitle(a: ArtistsHookType, b: ArtistsHookType) {
  return toSortableTitle(a.articleTitle).localeCompare(
    toSortableTitle(b.articleTitle),
    "fr",
    { sensitivity: "base" }
  );
}

async function getSortedArticles() {
  const { artists } = await getArtists();
  return artists.toSorted(byTitle);
}

export default async function Map() {
  const [{ locations, error }, articles] = await Promise.all([
    getMapLocations(),
    getSortedArticles(),
  ]);

  return (
    <>
      <MapPage locations={locations} error={error} />
      {articles.length > 0 && (
        <section className="px-4 py-8 text-left lg:px-24">
          <h2 className="pb-4 text-center text-lg font-thin uppercase">
            Les environnements
          </h2>
          <ul className="flex flex-col gap-1 text-sm font-light lg:text-base lg:font-extralight">
            {articles.map(({ articleId, articleTitle }) => (
              <li key={articleId}>
                <Link
                  href={`/article/${articleId}`}
                  prefetch={false}
                  className="landscape:hover:underline"
                >
                  {articleTitle.trim()}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
