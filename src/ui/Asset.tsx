import React, { useState } from 'react'
import useImageFromId from '../contentful/useAssetFromId'

export function Img({
  src,
  alt = '',
  className = '',
  description,
  loading = false,
}: {
  src: string
  alt?: string
  description?: string
  className?: string
  loading?: boolean
}) {
  const [imageLoading, setImageLoading] = useState(true)
  const isLoading = loading || imageLoading

  if (isLoading)
    return (
      <div
        className={`border-2 border-gray-100 bg-gray-50 p-1 rounded ${className}`}
      >
        <div className="flex justify-center bg-white  mx-auto  h-20 max-h-20 p-4 w-20 min-w-full">
          <span className=" block loader" />
        </div>
        <img
          src={src}
          alt={alt}
          className={`invisible h-0`}
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
        }}
        className={className}
      >
        <img
          src={src}
          alt={alt}
          style={{
            boxShadow: 'inset 0 0 10px white',
            borderRadius: 6,
            padding: 2,
          }}
          onLoad={() => setImageLoading(false)}
        />
      </div>
      {description && (
        <p className="text-sm">
          <em>{description}</em>
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

  console.log(image?.description)

  if (error) return <></>
  if (!image) return <></>
  return (
    <Img
      src={image.url}
      alt={alt}
      description={image.description}
      className="my-3 mx-auto "
      loading={loading}
    />
  )
}
