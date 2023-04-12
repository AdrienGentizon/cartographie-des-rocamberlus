import './globals.css'
import React from 'react'
import Header from '@/components/Header/Header'
import getAssetFromId from '@/queries/getAssetFromId'
import { ASSETS, NAV_ASSETS } from '@/utils/assetsIds'
import Container from '@/components/Container/Container'
import { Main } from '@/components/Main/Main'
import getHomePage from '@/queries/getHomePage'
import getArtists from '@/queries/getArtists'
import { ContentfulAsset } from '@/types'
import { Metadata } from 'next'

async function getAssets() {
  const assets = []
  for (const id of Object.values(ASSETS)) {
    const { image } = await getAssetFromId(id, { size: 192 })
    if (image) assets.push(image)
  }
  return assets
}

async function getHomePageContent() {
  const { homePage } = await getHomePage()

  return homePage
}

async function getHeaderContent() {
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

export const metadata: Metadata = {
  title: 'Cartographie des rocamberlus',
  description: "La cartographie des environnements d'art singulier",
  alternates: {
    canonical: `https://www.cartographie-des-rocamberlus.com/`,
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const homePage = await getHomePageContent()
  const header = await getHeaderContent()
  const assets = await getAssets()

  return (
    <html lang="fr">
      <body>
        <Container assets={assets}>
          <Header
            title={homePage?.title === null ? undefined : homePage?.title}
            mainTitlePicture={homePage?.mainTitlePicture}
            artists={header.artists}
            assets={header.assets}
          />
          {children}
        </Container>
      </body>
    </html>
  )
}
