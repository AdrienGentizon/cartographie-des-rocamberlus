import React, { useState } from 'react'
import useImageFromId from '../../graphql/useAssetFromId'

export function Img({
  src,
  alt = '',
  description,
  loading = false,
  style,
}: {
  src: string
  alt?: string
  description?: string | null
  loading?: boolean
  style?: React.CSSProperties
}) {
  const [imageLoading, setImageLoading] = useState(true)
  const isLoading = loading || imageLoading

  if (isLoading)
    return (
      <div
        style={{
          borderColor: 'rgb(243 244 246 / 1)',
          borderWidth: 2,
          borderRadius: '0.5rem',
          backgroundColor: 'rgb(249 250 251 / 1)',
          padding: 'O.25rem',
          ...style,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'rgb(255 255 255 / 1)',
            margin: '0 auto',
            height: '5rem',
            maxHeight: '5rem',
            padding: '1rem',
            width: '5rem',
            minWidth: '100%',
          }}
        >
          <span
            className="loader"
            style={{
              display: 'block',
            }}
          />
        </div>
        <img
          src={src}
          alt={alt}
          style={{
            visibility: 'hidden',
            height: 0,
          }}
          onLoad={() => setImageLoading(false)}
        />
      </div>
    )

  return (
    <div>
      <div
        style={{
          display: 'flex',
          width: 'fit-content',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 8,
          borderImageOutset: 0,
          borderImageSource: 'url(/picture-frame.png)',
          borderImageSlice: 16,
          borderImageRepeat: 'round',
          borderImageWidth: 1.5,
          ...style,
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            boxShadow: 'inset 0 0 10px white',
            borderRadius: 6,
            padding: 2,
            maxHeight: 480,
          }}
          onLoad={() => setImageLoading(false)}
        />
      </div>
      {description && (
        <p
          style={{
            fontWeight: 100,
            fontSize: '0.75rem',
            lineHeight: '1rem',
          }}
        >
          {description}
        </p>
      )}
    </div>
  )
}

interface PropsType {
  id: string
  alt?: string
}

export function Asset({ id, alt }: PropsType) {
  const { loading, error, image } = useImageFromId(id)

  const getDescription = () => {
    if (image?.description && image?.description !== '')
      return image.description
    if (image?.title && image?.title !== '') return image.title
    return undefined
  }

  if (error) return <></>
  if (!image) return <></>
  return (
    <Img
      src={image.url}
      alt={alt}
      description={getDescription()}
      style={{
        margin: '0 auto',
      }}
      loading={loading}
    />
  )
}
