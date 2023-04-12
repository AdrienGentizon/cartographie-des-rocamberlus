import MapPage from '@/app/map/MapPage'
import getArtists from '@/queries/getArtists'
import getLocations from '@/queries/getLocations'
import { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.cartographie-des-rocamberlus.com/map/`,
  },
}

async function getMapLocations() {
  const { locations, error } = await getLocations()
  return { locations, error }
}

async function getArticleIds() {
  const { artists: articles, error } = await getArtists()
  return {
    articles: error
      ? []
      : articles.map(({ articleId, articleTitle }) => ({
          articleId,
          articleTitle,
        })),
  }
}

export default async function Map() {
  const { locations, error } = await getMapLocations()
  const { articles } = await getArticleIds()
  return <MapPage locations={locations} articles={articles} error={error} />
}
