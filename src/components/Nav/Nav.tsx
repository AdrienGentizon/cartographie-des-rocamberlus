import React from 'react'
import { useHistory } from 'react-router-dom'
import useArtists from '../../contentful/useArtists'

import { CONTACT_URL, HOME_URL, MAP_URL } from '../../routes'
import MenuItem from './MenuItem/MenuItem'
import Search from './Search/Search'

export default function Nav() {
  const history = useHistory()
  const { artists } = useArtists()

  return (
    <nav className="flex flex-col">
      <ul className="flex justify-center gap-8 w-full h-full">
        <MenuItem url={HOME_URL} title="Maison" />
        <MenuItem url={MAP_URL} title="Carte" />
        <MenuItem url={CONTACT_URL} title="Contact" />
      </ul>
      {!history.location.pathname.startsWith('/map') && (
        <div className="px-32">
          <Search artists={artists} />
        </div>
      )}
    </nav>
  )
}
