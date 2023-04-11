import React, { useState } from 'react'
import GalleryItem from './GalleryItem'
import CloseButton from './CloseButton'
import Pagination from './Pagination'
import { ContentfulAsset } from '@/types'
import { customBorderCssProperties } from '@/components/CustomBorderDiv/CustomBorderDiv'
import { Dialog } from '@/components/Dialog/Dialog'

interface PropsType {
  assets: ContentfulAsset[]
  onClose: () => void
}

export default function SlideShow({ assets = [], onClose }: PropsType) {
  const [selectedAsset, setSelectedAsset] = useState(
    assets.length > 0 ? assets[0] : undefined
  )

  return (
    <Dialog
      style={{
        display: 'flex',
        width: '50vw',
        minWidth: '50vw',
        height: '60vh',
        alignItems: 'center',
        justifyContent: 'center',
        ...customBorderCssProperties,
        borderImageOutset: 0.001,
        background: 'hsla(0, 100%, 100%, 1)',
        borderRadius: '0.25rem',
      }}
      onClick={() => {
        setSelectedAsset((prev) => {
          if (!prev || assets.length === 0) return
          const prevIndex = assets.indexOf(prev)
          if (prevIndex === assets.length - 1) return assets[0]
          return assets[prevIndex + 1]
        })
      }}
      onClose={onClose}
    >
      <ul
        style={{
          display: 'flex',
          gap: '0.5rem',
        }}
      >
        {assets.map((asset, n) => (
          <li
            key={`slide-${n}`}
            style={{
              display: asset.url === selectedAsset?.url ? 'block' : 'none',
              margin: '0 auto',
              maxHeight: '60vh',
            }}
          >
            <GalleryItem asset={asset} />
          </li>
        ))}
        <li
          style={{
            position: 'absolute',
            bottom: 24,
            left: 0,
            width: '100%',
          }}
        >
          <Pagination assets={assets} selectedAsset={selectedAsset} />
        </li>
      </ul>
      <CloseButton onClose={onClose} />
    </Dialog>
  )
}
