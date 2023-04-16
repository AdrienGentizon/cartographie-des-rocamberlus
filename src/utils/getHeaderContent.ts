import getArtists from '@/queries/getArtists'
import getAssetFromId from '@/queries/getAssetFromId'
import { ContentfulAsset } from '@/types'
import { NAV_ASSETS } from './assetsIds'

export default async function getHeaderContent() {
  const { artists } = await getArtists()
  const assets: {
    contact?: ContentfulAsset
    carte?: ContentfulAsset
    accueil?: ContentfulAsset
  } = {}
  for (const [key, id] of Object.entries(NAV_ASSETS)) {
    const { image } = await getAssetFromId(id, { size: 256 })
    if (image)
      assets[
        key as keyof {
          contact?: ContentfulAsset
          carte?: ContentfulAsset
          accueil?: ContentfulAsset
        }
      ] = image
  }
  return { artists, assets }
}
