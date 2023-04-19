import React from 'react'
import { CONTACT_URL, HOME_URL, MAP_URL } from '../../../routes'
import MenuItem from './MenuItem/MenuItem'
import Search from './Search/Search'
import { ArtistsHookType, ContentfulAsset } from '@/types'

interface PropsType {
  artists: ArtistsHookType[]
  assets: {
    contact?: ContentfulAsset
    carte?: ContentfulAsset
    accueil?: ContentfulAsset
  }
  asSearch?: boolean
}

export default function Nav({
  artists,
  assets: { contact, carte, accueil },
  asSearch = false,
}: PropsType) {
  return (
    <nav
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
      className="pt-2 lg:pt-8"
    >
      <ul
        className="main-navigation"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '3rem',
          width: '100%',
          height: '100%',
        }}
      >
        <MenuItem url={HOME_URL} title="Accueil" asset={accueil} />
        <MenuItem url={MAP_URL} title="Carte" asset={carte} />
        <MenuItem url={CONTACT_URL} title="Contact" asset={contact} />
      </ul>
      {asSearch && (
        <div className="search-container">
          <Search artists={artists} />
        </div>
      )}
    </nav>
  )
}
