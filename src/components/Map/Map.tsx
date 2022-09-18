import React, { useRef } from "react"
import { useHistory } from "react-router-dom"
import MapBuilder from "../../components/Map/MapBuilder/MapBuilder"
import { ContentfulLocation } from "../../types"

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
      className="absolute w-screen top-0 left-0 h-screen z-0"
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
