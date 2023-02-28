import React from 'react'
import Layout from '../../components/Layout/Layout'

import Map from './Map/Map'

import useLocations from '../../contentful/useLocations'

function MapPage() {
  const { loading, error, locations } = useLocations()

  if (loading)
    return (
      <div
        id="map"
        className="flex w-full justify-center h-2/3 items-center border-4 mt-4 rounded-lg border-black"
      >
        <div className="loader" />
      </div>
    )

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
