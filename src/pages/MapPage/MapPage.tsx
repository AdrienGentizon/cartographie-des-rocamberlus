import React from 'react'
import Layout from '../../components/Layout/Layout'

import Map from './Map/Map'

import useLocations from '../../contentful/useLocations'

function MapPage() {
  const { loading, error, locations } = useLocations()

  if (loading) return <p>Loading...</p>

  if (error) return <p>Error!</p>

  if (locations.length > 0) return <Map locations={locations} />
  return <></>
}

export default function Wrapper() {
  return (
    <Layout>
      <MapPage />
    </Layout>
  )
}
