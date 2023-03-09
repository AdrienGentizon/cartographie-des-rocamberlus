import { useEffect } from 'react'
import useImageFromId from '../../../../../contentful/useAssetFromId'

type LoadedAssetEventDetail = { id: string; url?: string }

type PropsType = { id: string }

export default function LoadingAsset({ id }: PropsType) {
  const { image, loading, error } = useImageFromId(id)

  useEffect(() => {
    if (loading) return
    // error and image is null are considered loaded
    const event = new CustomEvent<LoadedAssetEventDetail>('assetloaded', {
      detail: {
        id,
        url: image?.url,
      },
    })
    dispatchEvent(event)
  }, [id, image, loading, error])

  return <></>
}
