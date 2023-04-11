import React from 'react'
import GalleryItem from './GalleryItem'
import { ContentfulAsset } from '@/types'

interface PropsType {
  assets: ContentfulAsset[]
}

export default function PreviewScrollBar({ assets = [] }: PropsType) {
  return (
    <ul
      style={{
        display: 'grid',
        gap: '0.125rem',
        minWidth: '100%',
        maxWidth: '100%',
        overflowX: 'scroll',
        gridRow: '1fr',
        gridAutoFlow: 'column',
        padding: '0 0.25rem',
        overflowY: 'hidden',
      }}
    >
      {assets.map((asset, n) => (
        <li
          key={`asset-${n}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <GalleryItem asset={asset} isThumbnail />
        </li>
      ))}
    </ul>
  )
}
