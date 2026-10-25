import { MetadataRoute } from "next";

import getArtists from "@/queries/getArtists";
import env from "@/utils/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { artists, error } = await getArtists();
  if (error) throw error;

  return [
    { url: env().BASE_URL },
    { url: `${env().BASE_URL}/map` },
    ...artists.map((artist) => ({
      url: `${env().BASE_URL}/article/${artist.articleId}`,
      lastModified: artist.publishedAt,
    })),
  ];
}
