import React, { useState } from 'react'
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
        width: '75vw',
        minWidth: '75vw',
        height: '75vh',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 8,
        borderImageOutset: '0.5 0.5',
        borderImageSource: 'url(/picture-frame.png)',
        borderImageSlice: 16,
        borderImageRepeat: 'round',
        borderImageWidth: 1.5,
        background: 'hsla(0, 0%, 0%, 0.75)',
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
              maxHeight: '75vh',
            }}
          >
            <GalleryItem id={id} />
          </li>
        ))}
        <li
          style={{
            position: 'absolute',
            bottom: 8,
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
