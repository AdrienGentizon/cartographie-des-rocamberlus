'use client'
import NextLink, { LinkProps } from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { CSSProperties, PropsWithChildren, useEffect, useState } from 'react'

export default function Link({
  children,
  onClick,
  ...props
}: PropsWithChildren<LinkProps & { style?: CSSProperties }>) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const loader = document.querySelector<HTMLDivElement>('.loader')

  useEffect(() => {
    if (loader) loader.style.display = 'none'

    return () => {
      if (loader) loader.style.display = 'none'
    }
  }, [loader])

  useEffect(() => {
    if (loader) loader.style.display = 'none'
  }, [pathname, searchParams, loader])

  return (
    <NextLink
      onClick={(e) => {
        if (loader) loader.style.display = 'block'
        if (onClick) onClick(e)
      }}
      {...props}
    >
      {children}
    </NextLink>
  )
}
