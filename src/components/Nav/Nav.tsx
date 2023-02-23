import React from 'react'
import useArtists from '../../contentful/useArtists'

import { CONTACT_URL, HOME_URL, MAP_URL } from '../../routes'
import MenuItem from './MenuItem/MenuItem'
import Search from './Search/Search'

export default function Nav() {
  const { artists } = useArtists()

  return (
    <nav>
      <ul className="flex justify-center gap-8 w-full h-full">
        <MenuItem url={HOME_URL} title="Home" />
        <MenuItem url={MAP_URL} title="Carte" />
        <MenuItem url={CONTACT_URL} title="Contact" />
        <Search artists={artists} />
      </ul>
    </nav>
  )
}
