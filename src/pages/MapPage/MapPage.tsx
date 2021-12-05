import React from "react"

import Map from "../../components/Map/Map"

import useLocations from "../../contentful/useLocations"
import { Main, P } from "../../ui"

export default function MapPage() {
  const { loading, error, data } = useLocations()

  if (loading)
    return (
      <Main>
        <P>Loading...</P>
      </Main>
    )

  if (error)
    return (
      <Main>
        <P>Error!</P>;
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
