import { MetadataRoute } from "next";

import getArtists from "@/queries/getArtists";
import env from "@/utils/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { artists } = await getArtists();

  return [
    { url: env().BASE_URL },
    { url: `${env().BASE_URL}/contact` },
    { url: `${env().BASE_URL}/map` },
    ...artists.map((artist) => ({
      url: `${env().BASE_URL}/article/${artist.articleId}`,
    })),
  ];
}
