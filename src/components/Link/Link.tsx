'use client'
import NextLink, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { CSSProperties, PropsWithChildren, useEffect } from 'react'
import { hideLoader, showLoader } from './Loader/Loader'

export default function Link({
  children,
  onClick,
  ...props
}: PropsWithChildren<LinkProps & { style?: CSSProperties }>) {
  const pathname = usePathname()
  const loader =
    typeof document === 'undefined'
      ? null
      : document.querySelector<HTMLDivElement>('.loader')

  useEffect(() => {
    hideLoader(loader)

    return () => {
      hideLoader(loader)
    }
  }, [loader])

  useEffect(() => {
    hideLoader(loader)
  }, [pathname, loader])

  return (
    <NextLink
      onClick={(e) => {
        if (pathname === props.href) hideLoader(loader)
        showLoader(loader)
        if (onClick) onClick(e)
      }}
      {...props}
    >
      {children}
    </NextLink>
  )
}
