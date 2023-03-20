import React from 'react'
import { useHistory } from 'react-router-dom'
import useArtists from '../../../../graphql/useArtists'
import useImageFromId from '../../../../graphql/useAssetFromId'

import { CONTACT_URL, HOME_URL, MAP_URL } from '../../../../routes'
import MenuItem from './MenuItem/MenuItem'
import Search from './Search/Search'

const CONTACT_ID = '5f5T2Q1PWn4QMmoVhyo9lK'
const CONTACT_HOVER_ID = '68EFAxMOqA73HkNmGlJSkL'
const CARTE_ID = '3hnECgYsTVQLTaHgBV2JJY'
const CARTE_HOVER_ID = '7fmt3U1jnGTziEOPnNsAxA'
const ACCUEIL_ID = '7pIx1x9yol6iORr3uCLSch'
const ACCUEIL_HOVER_ID = '6DngxYDMuxUnIuHirfpAkC'

export default function Nav() {
  const history = useHistory()
  const { artists } = useArtists()
  const { image: contact, loading: loadingContact } = useImageFromId(CONTACT_ID)
  const { image: contactHover, loading: loadingContactHover } =
    useImageFromId(CONTACT_HOVER_ID)
  const { image: carte, loading: loadingCarte } = useImageFromId(CARTE_ID)
  const { image: carteHover, loading: loadingCarteHover } =
    useImageFromId(CARTE_HOVER_ID)
  const { image: accueil, loading: loadingAccueil } = useImageFromId(ACCUEIL_ID)
  const { image: accueilHover, loading: loadingAccueilHover } =
    useImageFromId(ACCUEIL_HOVER_ID)

  if (
    loadingContact ||
    loadingCarte ||
    loadingAccueil ||
    loadingContactHover ||
    loadingCarteHover ||
    loadingAccueilHover
  )
    return <></>

  return (
    <nav className="flex flex-col pt-2">
      <ul className="flex justify-center gap-8 w-full h-full px-8 lg-px-0">
        <MenuItem
          url={HOME_URL}
          title="Accueil"
          idleBgSrc={accueil?.url}
          hoverBgSrc={accueilHover?.url}
        />
        <MenuItem
          url={MAP_URL}
          title="Carte"
          idleBgSrc={carte?.url}
          hoverBgSrc={carteHover?.url}
        />
        <MenuItem
          url={CONTACT_URL}
          title="Contact"
          idleBgSrc={contact?.url}
          hoverBgSrc={contactHover?.url}
        />
      </ul>
      {!history.location.pathname.startsWith('/map') &&
        !history.location.pathname.startsWith('/contact') && (
          <div className="lg:px-32 lg:pt-4 px-4">
            <Search artists={artists} />
          </div>
        )}
    </nav>
  )
}
