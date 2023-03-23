import React, { useEffect, useState } from 'react'
import { Main } from './Main/Main'
import Container from './Container/Container'
import Header from './Header/Header'
import { ASSETS } from '../../utils/assetsIds'
import LoadingAsset from './Container/BackGroundRandom/LoadingAsset/loadingAsset'
import { useHistory } from 'react-router-dom'

type LoadedAssetEventDetail = { id: string; url?: string }

function isCustomEvent(
  e: Event | CustomEvent
): e is CustomEvent<LoadedAssetEventDetail> {
  return (e as CustomEvent<LoadedAssetEventDetail>).detail.id !== undefined
}

export function Layout({
  imageUrls,
  children,
}: React.PropsWithChildren<{ imageUrls: string[] }>) {
  return (
    <Container imageUrls={imageUrls}>
      <Header />
      <Main>{children}</Main>
    </Container>
  )
}
let imageUrls: string[] = []

export default function Wrapper({ children }: React.PropsWithChildren<{}>) {
  const history = useHistory()
  const [urls, setUrls] = useState<string[]>([])
  useEffect(() => {
    window.addEventListener('assetloaded', (e) => {
      // assetloaded is fired whether asset successfully loaded or error occured
      // this means that we should always have fetch/response number in sync
      // worst case scenario all fetchs failed then we still end with an all loaded status
      if (isCustomEvent(e)) {
        imageUrls = [
          ...imageUrls.filter((url) => url !== e.detail.url),
          e.detail.url,
        ].filter((url): url is string => url !== undefined)
        if (imageUrls.length === Object.values(ASSETS).length)
          setUrls(imageUrls)
      }
    })
    return () => {
      window.removeEventListener('assetloaded', () => {
        //
      })
    }
  }, [])

  useEffect(() => {
    setUrls(imageUrls)
  }, [history.location.pathname])

  return (
    <>
      {/* empty node used to upload asset and update loaded assets array accordingly */}
      {React.Children.map(Object.values(ASSETS), (id) => (
        <LoadingAsset id={id} />
      ))}

      <Layout imageUrls={urls}>{children}</Layout>
    </>
  )
}
