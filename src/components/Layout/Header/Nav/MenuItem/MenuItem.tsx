import React, { useEffect } from 'react'

import { NavLink } from 'react-router-dom'
import isDesktop from '../../../../../utils/isDesktop'

type MenuItemProps = React.PropsWithChildren<{
  url: string
  title: string
  idleBgSrc?: string
  hoverBgSrc?: string
}>

export default function MenuItem({
  url,
  idleBgSrc,
  hoverBgSrc,
  title,
}: MenuItemProps) {
  const className = `nav-link nav-link-${title}`

  useEffect(() => {
    if (idleBgSrc && hoverBgSrc) {
      document.body.style.setProperty(
        `--nav-link-${title}`,
        `url(${idleBgSrc})`
      )
      document.body.style.setProperty(
        `--nav-link-${title}--hover`,
        `url(${hoverBgSrc})`
      )
    }
  }, [idleBgSrc, hoverBgSrc, title])

  return (
    <>
      <li
        style={{
          height: isDesktop() ? '2.5rem' : '1.25rem',
          width: isDesktop() ? '8rem' : '5rem',
        }}
      >
        <NavLink
          exact
          activeClassName={`nav-link nav-link-${title} nav-link--active`}
          className={className}
          style={{
            display: 'block',
            transitionProperty: 'opacity',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDuration: '150ms',
            backgroundSize: 'contain',
          }}
          to={url}
        >
          {(!idleBgSrc || !hoverBgSrc) && <>{title}</>}
        </NavLink>
      </li>
      <li className="preload">
        <ul>
          <li className={`nav-link nav-link-${title}`} />
          <li className={`nav-link nav-link-${title} nav-link--active`} />
        </ul>
      </li>
    </>
  )
}
