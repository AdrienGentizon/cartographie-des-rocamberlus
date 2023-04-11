'use client'
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { ContentfulAsset } from '@/types'
import { usePathname } from 'next/navigation'

const ITEM_DENSITY = 0.85
const ITEM_ROTATION = 0

type PropsType = {
  assets: ContentfulAsset[]
}

export function BackGroundRandom({
  assets,
  children,
}: PropsWithChildren<PropsType>) {
  const pathname = usePathname()

  useEffect(() => {
    //
  }, [pathname])

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
          if (Math.random() < ITEM_DENSITY)
            return <div key={`empty-div-${n}`} />
          return (
            <div
              key={`empty-div-${n}`}
              style={{
                backgroundImage: `url('${
                  assets[Math.floor(assets.length * Math.random())].url
                }')`,
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
