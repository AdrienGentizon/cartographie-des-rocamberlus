'use client'
import NextLink, { LinkProps } from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { CSSProperties, PropsWithChildren, useEffect, useState } from 'react'
import { hideLoader, showLoader } from './Loader/Loader'

export default function Link({
  children,
  onClick,
  ...props
}: PropsWithChildren<LinkProps & { style?: CSSProperties }>) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const loader = document.querySelector<HTMLDivElement>('.loader')

  useEffect(() => {
    hideLoader(loader)

    return () => {
      hideLoader(loader)
    }
  }, [loader])

  useEffect(() => {
    hideLoader(loader)
  }, [pathname, searchParams, loader])

  return (
    <NextLink
      onClick={(e) => {
        showLoader(loader)
        if (onClick) onClick(e)
      }}
      {...props}
    >
      {children}
    </NextLink>
  )
}
