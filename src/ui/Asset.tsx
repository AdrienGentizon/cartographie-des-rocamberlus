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
      {isLoading && <span className="flex mx-auto my-2 loader" />}
      <img
        src={src}
        alt={alt}
        className={`${
          isLoading ? 'invisible' : ''
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
  const { loading, error, data } = useImageFromId(id)

  if (error) console.error(error.message)
  if (error) return <></>
  if (!data) return <></>
  return (
    <Img src={data.asset.url} alt={alt} className="my-3" loading={loading} />
  )
}
