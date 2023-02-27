import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import MapBuilder from './MapBuilder/MapBuilder'
import { ContentfulLocation } from '../../../types'

interface PropsType {
  locations: ContentfulLocation[]
}

export default function Map({ locations }: PropsType) {
  const history = useHistory()

  const mapRef = useRef<HTMLDivElement>(null)

  const onSelectedLocation = (location: ContentfulLocation) => {
    history.push(`/article/${location.sys.id}`)
  }
  const [hoveredLocation, setHoveredLocation] = useState<
    ContentfulLocation | undefined
  >(undefined)
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
          onHoveringLocation={setHoveredLocation}
        />
      )}

      <dialog
        className={`absolute p-2 top-0 z-40 rounded shadow-xl mt-4 ${
          hoveredLocation ? 'visible opacity-100' : 'invisible opacity-0'
        }
        transition-opacity duration-300 ease-in-out
        `}
        open
      >
        {hoveredLocation && (
          <p className="font-thin">{hoveredLocation.title}</p>
        )}
      </dialog>
    </div>
  )
}
