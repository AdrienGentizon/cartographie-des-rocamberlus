import React, { useState } from 'react'
import useDebounce from '../../../../hooks/useDebounce'

const CELL_SIZE = 96
const ITEM_DENSITY = 0.8
const ITEM_ROTATION = 0

type PropsType = {
  containerHeight: number
  imageUrls: string[]
}

export function BackGroundRandom({ containerHeight, imageUrls }: PropsType) {
  const [cells, setCells] = useState(0)

  // while loading article images
  // container height updates frequently
  // we then have to prevent background flickering
  // and regenerating with new random assets
  const nColumns = Math.floor(window.innerWidth / CELL_SIZE)
  const nRows = Math.floor(containerHeight / CELL_SIZE)
  const debounce = useDebounce(() => setCells(nColumns * nRows), 1000)
  debounce()

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat( auto-fill, minmax(${CELL_SIZE}px, 1fr) )`,
        gridTemplateRows: `repeat( auto-fit, minmax(${CELL_SIZE}px, 1fr) )`,
        placeItems: 'center',
        minHeight: containerHeight,
        width: '100vw',
        position: 'absolute',
        zIndex: -10,
      }}
    >
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
                // scale: `${Math.max(0.5, Math.random())}`,
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
