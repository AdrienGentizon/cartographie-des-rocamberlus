import React, { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import MapBuilder from '../../components/Map/MapBuilder/MapBuilder'
import { ContentfulLocation } from '../../types'

interface PropsType {
  locations: ContentfulLocation[]
}

export default function Map({ locations }: PropsType) {
  const history = useHistory()

  const mapRef = useRef<HTMLDivElement>(null)

  const onSelectedLocation = (location: ContentfulLocation) => {
    history.push(`/article/${location.sys.id}`)
  }
  return (
    <div
      id="map"
      className="absolute w-full max-w-2xl h-2/3 border-4 border-black rounded-lg mt-4 bg-black"
      ref={mapRef}
    >
      {mapRef && (
        <MapBuilder
          mapRef={mapRef}
          locations={locations}
          onSelectedLocation={onSelectedLocation}
        />
      )}
    </div>
  )
}
