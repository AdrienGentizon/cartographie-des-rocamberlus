import { useState } from 'react'
import useImageFromId from '../../../../contentful/useAssetFromId'
import useDebounce from '../../../../hooks/useDebounce'

const MILL_ID = '3agj2s4Uqz2gIjkxAoVIGy'
const BORIE_ID = '7wxSIV2ollwz7lEAxlbpt4'
const VENUS_ID = '4ImM2j4tL1z5Yg7yuiz7SR'
const DEER_ID = '2WlIf3SOvzVVg9NraIuDfd'
const ELEFANT_ID = '63SBdGZHOxTTFg4bheOY24'
const TRUELLE_ID = '65APH11IpPHVkyQD1WsuXc'
const BROUETTE_ID = '3TgLWOnNssc61Cc32QO0wK'
const KING_ID = '5x2dGJ9NUm1pjaMhQnUaXB'
const FAMILY_ID = '5r5TVJ2Uk2ja0vFRoc0y63'

const CELL_SIZE = 96
const ITEM_DENSITY = 0.8
const ITEM_ROTATION = 20

interface PropsType {
  containerHeight: number
}

export default function BackGroundRandom({ containerHeight }: PropsType) {
  const {
    image: mill,
    loading: loadingMill,
    error: errorMill,
  } = useImageFromId(MILL_ID)
  const {
    image: borie,
    loading: loadingBorie,
    error: errorBorie,
  } = useImageFromId(BORIE_ID)
  const {
    image: venus,
    loading: loadingVenus,
    error: errorVenus,
  } = useImageFromId(VENUS_ID)
  const {
    image: deer,
    loading: loadingDeer,
    error: errorDeer,
  } = useImageFromId(DEER_ID)
  const {
    image: elefant,
    loading: loadingElefant,
    error: errorElefant,
  } = useImageFromId(ELEFANT_ID)
  const {
    image: king,
    loading: loadingKing,
    error: errorKing,
  } = useImageFromId(KING_ID)
  const {
    image: truelle,
    loading: loadingTruelle,
    error: errorTruelle,
  } = useImageFromId(TRUELLE_ID)
  const {
    image: brouette,
    loading: loadingBrouette,
    error: errorBrouette,
  } = useImageFromId(BROUETTE_ID)
  const {
    image: family,
    loading: loadingFamily,
    error: errorFamily,
  } = useImageFromId(FAMILY_ID)

  const [cells, setCells] = useState(0)

  const loading =
    loadingMill ||
    loadingBorie ||
    loadingVenus ||
    loadingDeer ||
    loadingElefant ||
    loadingKing ||
    loadingTruelle ||
    loadingBrouette ||
    loadingFamily
  const error =
    errorMill ||
    errorBorie ||
    errorVenus ||
    errorDeer ||
    errorElefant ||
    errorKing ||
    errorTruelle ||
    errorBrouette ||
    errorFamily

  const images = [
    venus,
    truelle,
    elefant,
    deer,
    mill,
    borie,
    family,
    brouette,
    king,
  ]

  const nColumns = Math.floor(window.innerWidth / CELL_SIZE)
  const nRows = Math.floor(containerHeight / CELL_SIZE)
  const debounce = useDebounce(() => setCells(nColumns * nRows), 1000)
  debounce()

  if (loading || error) return <></>
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
      {[...Array(cells)].map((_, n: number) => {
        const source = images.at(Math.floor(images.length * Math.random()))
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
              src={source.url}
            />
          </div>
        )
      })}
    </div>
  )
}
