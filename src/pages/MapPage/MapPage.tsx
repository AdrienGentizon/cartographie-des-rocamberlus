import React from 'react'
import Layout from '../../components/Layout/Layout'

import Map from './Map/Map'

import useLocations from '../../contentful/useLocations'
import { Main } from '../../ui'

function MapPage() {
  const { loading, error, locations } = useLocations()

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

  if (locations.length > 0)
    return (
      <Main>
        <Map locations={locations} />
      </Main>
    )
  return <Main></Main>
}

export default function Wrapper() {
  return (
    <Layout>
      <MapPage />
    </Layout>
  )
}
