import './globals.css'
import React from 'react'
import getAssetFromId from '@/queries/getAssetFromId'
import { ASSETS } from '@/utils/assetsIds'
import Container from '@/components/Container/Container'
import { Metadata } from 'next'
import Loader from '@/components/Link/Loader/Loader'
import StorageProvider from './contexts/StorageContext'

async function getAssets() {
  const assets = []
  for (const id of Object.values(ASSETS)) {
    const { image } = await getAssetFromId(id, { size: 192 })
    if (image) assets.push(image)
  }
  return assets
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
  const assets = await getAssets()

  return (
    <html lang="fr">
      <StorageProvider>
        <body>
          <Container assets={assets}>{children}</Container>
          <Loader />
        </body>
      </StorageProvider>
    </html>
  )
}
