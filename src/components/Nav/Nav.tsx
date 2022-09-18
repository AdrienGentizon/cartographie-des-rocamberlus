import React from "react"

import { CONTACT_URL, HOME_URL, MAP_URL } from "../../routes"
import MenuItem from "./MenuItem/MenuItem"

export default function Nav() {
  return (
    <nav>
      <ul
        className={`
      flex justify-center gap-8
      w-full h-full
      `}
      >
        <MenuItem url={HOME_URL} title="Home" />
        <MenuItem url={MAP_URL} title="Carte" />
        <MenuItem url={CONTACT_URL} title="Contact" />
      </ul>
    </nav>
  )
}
