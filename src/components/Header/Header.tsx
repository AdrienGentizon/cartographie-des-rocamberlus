import React from 'react'
import Nav from './Nav/Nav'
import Title from './Title/Title'
import { ArtistsHookType, ContentfulAsset } from '@/types'

interface PropsType {
  title?: string
  mainTitlePicture?: { url: string; width: number; height: number } | null
  artists: ArtistsHookType[]
  assets: {
    contact?: ContentfulAsset
    carte?: ContentfulAsset
    accueil?: ContentfulAsset
  }
  asSearch?: boolean
}

export default function Header({
  title,
  mainTitlePicture,
  artists,
  assets,
  asSearch = false,
}: PropsType) {
  return (
    <header
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Title title={title} mainTitlePicture={mainTitlePicture} />
      <Nav artists={artists} assets={assets} asSearch={asSearch} />
    </header>
  )
}
