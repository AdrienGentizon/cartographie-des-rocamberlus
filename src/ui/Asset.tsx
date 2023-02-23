import React, { useState } from 'react'
import useImageFromId from '../contentful/useAssetFromId'

export function Img({
  src,
  alt = '',
  className = '',
  loading = false,
}: {
  src: string
  alt?: string
  className?: string
  loading?: boolean
}) {
  const [imageLoading, setImageLoading] = useState(true)
  const isLoading = loading || imageLoading

  return (
    <>
      {isLoading && (
        <div
          className={`border-2 border-gray-100 bg-gray-50 p-1 rounded ${className}`}
        >
          <div className="flex justify-center bg-white  mx-auto  h-20 max-h-20 p-4 w-20 min-w-full">
            <span className=" block loader" />
          </div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${
          isLoading ? 'invisible h-0' : ''
        } border-2 border-gray-100 bg-gray-50 p-1 rounded ${className}`}
        onLoad={() => setImageLoading(false)}
      />
    </>
  )
}

interface PropsType {
  id: string
  alt?: string
}

export function Asset({ id, alt }: PropsType) {
  const { loading, error, image } = useImageFromId(id)

  if (error) console.error(error.message)
  if (error) return <></>
  if (!image) return <></>
  return <Img src={image.url} alt={alt} className="my-3" loading={loading} />
}
