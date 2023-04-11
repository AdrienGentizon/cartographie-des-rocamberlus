'use client'
import React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { ContentfulAsset } from '@/types'

type MenuItemProps = React.PropsWithChildren<{
  url: string
  title: string
  asset?: ContentfulAsset
}>

export default function MenuItem({ url, asset, title }: MenuItemProps) {
  const pathname = usePathname()

  return (
    <>
      <li className={pathname === url ? 'nav-link active' : 'nav-link'}>
        <Link href={url}>
          {asset && (
            <Image
              src={asset.url}
              alt={`link ${title}`}
              width={asset.width}
              height={asset.height}
            />
          )}
          {!asset && <>{title}</>}
        </Link>
      </li>
    </>
  )
}
