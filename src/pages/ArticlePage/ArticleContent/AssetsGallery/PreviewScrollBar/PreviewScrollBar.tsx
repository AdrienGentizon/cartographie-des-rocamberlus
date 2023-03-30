import React from 'react'
import GalleryItem from '../GalleryItem/GalleryItem'

interface PropsType {
  assetIds: string[]
}

export default function PreviewScrollBar({ assetIds }: PropsType) {
  return (
    <ul
      style={{
        display: 'grid',
        gap: '0.5rem',
        minWidth: '100%',
        maxWidth: '100%',
        height: '12rem',
        overflowX: 'scroll',
        gridRow: 'repeat(1, 48px)',
        gridAutoFlow: 'column',
        padding: '0 0.25rem',
        overflowY: 'hidden',
      }}
    >
      {React.Children.map(assetIds, (id) => (
        <li>
          <GalleryItem
            id={id}
            style={{
              height: '12rem',
              maxWidth: 'none',
            }}
          />
        </li>
      ))}
    </ul>
  )
}
