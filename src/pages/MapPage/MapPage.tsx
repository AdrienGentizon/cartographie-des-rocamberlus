import React from 'react'
import Layout from '../../components/Layout/Layout'

import Map from '../../components/Map/Map'

import useLocations from '../../contentful/useLocations'
import { Main } from '../../ui'

function MapPage() {
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

export default function Wrapper() {
  return (
    <Layout>
      <MapPage />
    </Layout>
  )
}
