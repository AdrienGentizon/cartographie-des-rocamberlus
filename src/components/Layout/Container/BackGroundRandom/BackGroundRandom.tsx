import React, { useEffect, useRef, useState } from 'react'
import useDebounce from '../../../../hooks/useDebounce'
import LoadingAsset from './LoadingAsset/loadingAsset'

const IMAGE_IDS = [
  '3agj2s4Uqz2gIjkxAoVIGy', // mill
  '7wxSIV2ollwz7lEAxlbpt4', // borie
  '4ImM2j4tL1z5Yg7yuiz7SR', // venus
  '2WlIf3SOvzVVg9NraIuDfd', // deer
  '63SBdGZHOxTTFg4bheOY24', // elefant
  '65APH11IpPHVkyQD1WsuXc', // truelle
  '3TgLWOnNssc61Cc32QO0wK', // brouette
  '5x2dGJ9NUm1pjaMhQnUaXB', // king
  '5r5TVJ2Uk2ja0vFRoc0y63', // family
]

const CELL_SIZE = 96
const ITEM_DENSITY = 0.8
const ITEM_ROTATION = 20

type LoadedAssetEventDetail = { id: string; url?: string }

function isCustomEvent(
  e: Event | CustomEvent
): e is CustomEvent<LoadedAssetEventDetail> {
  return (e as CustomEvent<LoadedAssetEventDetail>).detail.id !== undefined
}

interface PropsType {
  containerHeight: number
}

export default function BackGroundRandom({ containerHeight }: PropsType) {
  const [cells, setCells] = useState(0)

  // while loading article images
  // container height updates frequently
  // we then have to prevent background flickering
  // and regenerating with new random assets
  const nColumns = Math.floor(window.innerWidth / CELL_SIZE)
  const nRows = Math.floor(containerHeight / CELL_SIZE)
  const debounce = useDebounce(() => setCells(nColumns * nRows), 1000)
  debounce()

  const [imageUrls, setImageUrls] = useState<string[]>([])
  const loadedOrFailedAssets = useRef<LoadedAssetEventDetail[]>([])

  useEffect(() => {
    window.addEventListener('assetloaded', (e) => {
      // assetloaded is fired whether asset successfully loaded or error occured
      // this means that we should always have fetch/response number in sync
      // worst case scenario all fetchs failed then we still end with an all loaded status
      if (isCustomEvent(e)) {
        loadedOrFailedAssets.current.push(e.detail)
      }
      if (loadedOrFailedAssets.current.length === IMAGE_IDS.length) {
        setImageUrls(
          loadedOrFailedAssets.current
            .map(({ url }) => url)
            .filter((url): url is string => url !== undefined)
        )
        loadedOrFailedAssets.current = []
      }
    })
    return () => {}
  }, [])

  return (
    <div
      className="w-screen absolute"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat( auto-fill, minmax(${CELL_SIZE}px, 1fr) )`,
        gridTemplateRows: `repeat( auto-fit, minmax(${CELL_SIZE}px, 1fr) )`,
        placeItems: 'center',
        minHeight: containerHeight,
      }}
    >
      {/* empty node used to upload asset and update loaded assets array accordingly */}
      {React.Children.map(IMAGE_IDS, (id) => (
        <LoadingAsset id={id} />
      ))}
      {/* cells number is computed against window width and overflowing content height */}
      {[...Array(cells)].map((_, n: number) => {
        const source = imageUrls.at(
          Math.floor(imageUrls.length * Math.random())
        )
        const alea = Math.random()
        if (!source || alea < ITEM_DENSITY)
          return (
            <div
              key={`particle-${n}`}
              style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
              }}
            />
          )
        return (
          <div
            key={`particle-${n}`}
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
            }}
          >
            <img
              alt="particle"
              style={{
                maxHeight: CELL_SIZE,
                marginInline: 'auto',
                scale: `${Math.max(0.5, Math.random())}`,
                rotate: `${ITEM_ROTATION * (-1 * Math.random() + 0.5)}deg`,
                transform: Math.random() > 0.5 ? `rotateY(180deg)` : undefined,
                animation: 'fade-in ease-in-out 300ms',
              }}
              src={source}
            />
          </div>
        )
      })}
    </div>
  )
}
