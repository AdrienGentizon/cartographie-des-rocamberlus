import React from 'react'

import Map from '../../components/Map/Map'

import useLocations from '../../contentful/useLocations'
import { Main } from '../../ui'

export default function MapPage() {
  const { loading, error, data } = useLocations()

  if (loading)
    return (
      <Main>
        <p>Loading...</p>
      </Main>
    )

  if (error)
    return (
      <Main>
        <p>Error!</p>;
      </Main>
    )

  if (data)
    return (
      <Main fullWidth>
        <Map locations={data.articleCollection.items} />
      </Main>
    )
  return <Main></Main>
}
