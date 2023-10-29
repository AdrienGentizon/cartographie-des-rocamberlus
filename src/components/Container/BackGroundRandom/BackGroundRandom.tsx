'use client'

import React, { ReactNode } from 'react'
import { ContentfulAsset } from '@/types'

const ITEM_DENSITY = 0.85
const ITEM_ROTATION = 0

export function BackGroundRandom({
  assets,
  children,
}: {
  assets: ContentfulAsset[]
  children: ReactNode
}) {
  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <div
        className="random-background"
        style={{
          height: '100%',
        }}
      >
        {Array.from({ length: 10000 }).map((_, n) => {
          const url = assets.at(Math.floor(assets.length * Math.random()))?.url

          if (Math.random() < ITEM_DENSITY || !url)
            return <div key={`empty-div-${n}`} />

          return (
            <div
              key={`empty-div-${n}`}
              style={{
                backgroundImage: `url('${url}')`,
                rotate: `${ITEM_ROTATION * (-1 * Math.random() + 0.5)}deg`,
                transform: Math.random() > 0.5 ? `rotateY(180deg)` : undefined,
              }}
            />
          )
        })}
      </div>
      {children}
    </div>
  )
}
