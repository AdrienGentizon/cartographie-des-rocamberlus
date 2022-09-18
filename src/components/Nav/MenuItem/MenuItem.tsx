import React from "react"

import { NavLink } from "react-router-dom"

interface MenuItemProps {
  url: string
  title: string
}

export default function MenuItem({ url, title }: MenuItemProps) {
  return (
    <li className={`flex`}>
      <NavLink
        exact
        activeClassName={`border-gray-400 border-b`}
        className={`
        pt-2 pb-1 px-4
        border-b-2 border-transparent
          
      hover:border-gray-600 hover:text-gray-600
      
        transition-all ease-in-out duration-500
      `}
        to={url}
      >
        {title}
      </NavLink>
    </li>
  )
}
