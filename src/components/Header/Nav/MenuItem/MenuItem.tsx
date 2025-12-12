'use client'
import React from 'react'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { ContentfulAsset } from '@/types'
import Link from '@/components/Link/Link'

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
          <span className="sr-only">{title}</span>
          {asset && (
            <Image
              src={asset.url}
              alt={asset.description ?? asset.title ?? ''}
              width={asset.width}
              height={asset.height}
              aria-hidden
            />
          )}
          {!asset && <>{title}</>}
        </Link>
      </li>
    </>
  )
}
