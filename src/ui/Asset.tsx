import React from 'react'
import useImageFromId from '../contentful/useAssetFromId'

export function Img({
  src,
  alt = '',
  className = '',
}: {
  src: string
  alt?: string
  className?: string
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={`border-2 border-gray-100 bg-gray-50 p-1 rounded ${className}`}
    />
  )
}

interface PropsType {
  id: string
  alt?: string
}

export function Asset({ id, alt }: PropsType) {
  const { loading, error, data } = useImageFromId(id)

  if (loading) return <p className="font-extralight">Loading...</p>
  if (error) return <p>Error!</p>
  if (!data) return <></>
  return <Img src={data.asset.url} alt={alt} className="my-3" />
}
