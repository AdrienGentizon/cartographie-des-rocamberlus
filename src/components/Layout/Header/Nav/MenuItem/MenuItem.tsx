import React, { useEffect } from 'react'

import { NavLink } from 'react-router-dom'

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
  const className = `nav-link nav-link-${title} block transition-opacity ease-in-out bg-contain bg-repeat-none`

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
      <li className=" h-5 w-20 lg:h-10 lg:w-32">
        <NavLink
          exact
          activeClassName={`nav-link nav-link-${title} nav-link--active`}
          className={className}
          to={url}
        >
          {(!idleBgSrc || !hoverBgSrc) && <>{title}</>}
        </NavLink>
      </li>
      <ul className="preload">
        <li className={`nav-link nav-link-${title}`} />
        <li className={`nav-link nav-link-${title} nav-link--active`} />
      </ul>
    </>
  )
}
