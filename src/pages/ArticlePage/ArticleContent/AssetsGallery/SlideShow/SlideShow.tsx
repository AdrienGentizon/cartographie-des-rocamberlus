import React, { useState } from 'react'
import { customBorderCssProperties } from '../../../../../components/CustomBorderDiv/CustomBorderDiv'
import { Dialog } from '../../../../../components/Dialog/Dialog'
import GalleryItem from '../GalleryItem/GalleryItem'
import CloseButton from './CloseButton/CloseButton'
import Pagination from './Pagination/Pagination'

interface PropsType {
  assetIds: string[]
  onClose: () => void
}

export default function SlideShow({ assetIds, onClose }: PropsType) {
  const [selectedAssetId, setSelectedAssetId] = useState(
    assetIds.length > 0 ? assetIds[0] : undefined
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
        setSelectedAssetId((prev) => {
          if (!prev || assetIds.length === 0) return
          const prevIndex = assetIds.indexOf(prev)
          if (prevIndex === assetIds.length - 1) return assetIds[0]
          return assetIds[prevIndex + 1]
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
        {React.Children.map(assetIds, (id) => (
          <li
            style={{
              display: id === selectedAssetId ? 'block' : 'none',
              margin: '0 auto',
              maxHeight: '60vh',
            }}
          >
            <GalleryItem id={id} />
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
          <Pagination assetIds={assetIds} selectedAssetId={selectedAssetId} />
        </li>
      </ul>
      <CloseButton onClose={onClose} />
    </Dialog>
  )
}
