import React, { useRef, useState } from 'react'
import MapBuilder from './MapBuilder'
import { ContentfulLocation } from '../../types'
import { useRouter } from 'next/navigation'

interface PropsType {
  locations: ContentfulLocation[]
}

export default function Map({ locations }: PropsType) {
  const router = useRouter()

  const mapRef = useRef<HTMLDivElement>(null)

  const onSelectedLocation = (location: ContentfulLocation) => {
    router.push(`/article/${location.sys.id}`)
  }
  const [hoveredLocation, setHoveredLocation] = useState<
    ContentfulLocation | undefined
  >(undefined)
  return (
    <div
      id="map"
      className="absolute w-full max-w-2xl border-4 border-black rounded-lg mt-4 bg-black purpl"
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
