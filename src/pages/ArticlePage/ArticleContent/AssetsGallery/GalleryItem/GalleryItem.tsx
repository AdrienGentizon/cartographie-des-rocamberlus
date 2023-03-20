import React from 'react'
import useImageFromId from '../../../../../graphql/useAssetFromId'

export default function GalleryItem({
  id,
  style,
}: {
  id: string
  style?: React.CSSProperties
}) {
  const { image } = useImageFromId(id)

  if (!image) return <></>
  return (
    <div
      style={{
        maxHeight: 'inherit',
      }}
    >
      <img
        style={{
          maxHeight: 'inherit',
          padding: '8px 0',
          ...style,
        }}
        src={image.url}
        alt=""
      />
    </div>
  )
}
