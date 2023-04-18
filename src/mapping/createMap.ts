import Map from 'ol/Map'
import View from 'ol/View'
import XYZ from 'ol/source/XYZ'
import * as olProj from 'ol/proj'
import Feature from 'ol/Feature'
import { Geometry, Point } from 'ol/geom'
import VectorSource from 'ol/source/Vector'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { Icon, Style } from 'ol/style'

import MapBrowserEvent from 'ol/MapBrowserEvent'
import { ContentfulLocation, GqlLocation } from '../types'

const FRANCE_COORDINATES = {
  gps_longitude: 2.3632841,
  gps_latitude: 47.0780911,
} // Bourges gps coordinates

interface CreateMapOptions {
  center: {
    gps_longitude: number
    gps_latitude: number
  }
  zoom: number
}

function initMap(mapId: string, options?: CreateMapOptions) {
  const { clientHeight, clientWidth } = document.documentElement
  const baseLength =
    clientHeight > clientWidth ? clientWidth * 0.1 : clientHeight
  const baseZoom = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    ? 6.1
    : 5.8
  const baseHeight = window.innerHeight
  const zoom =
    baseZoom - (Math.log10(baseHeight / baseLength) * baseZoom) / baseZoom

  const _options: CreateMapOptions = options
    ? { ...options }
    : { center: FRANCE_COORDINATES, zoom }

  const urls = {
    toner: 'https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
    tonerBackground:
      'https://stamen-tiles.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png',
    base: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  }

  const map = new Map({
    target: mapId,
    layers: [
      new TileLayer({
        source: new XYZ({
          url: urls.tonerBackground,
        }),
      }),
    ],
    view: new View({
      center: olProj.fromLonLat([
        _options.center.gps_longitude,
        _options.center.gps_latitude,
      ]),
      zoom: _options.zoom,
    }),
  })

  return map
}

function generateMarkersFromLocations(
  locations: ContentfulLocation[]
): Feature<Geometry>[] {
  return locations
    .filter(
      (location) =>
        location.locationGpsCoordinates.lon &&
        location.locationGpsCoordinates.lat
    )
    .map(
      (location) =>
        new Feature({
          geometry: new Point(
            olProj.fromLonLat([
              location.locationGpsCoordinates.lon!,
              location.locationGpsCoordinates.lat!,
            ])
          ),
          id: location.sys.id,
          name: location.locationName,
          description: location.locationDescription,
          locationObj: location,
        })
    )
}

function getMarkerStyle(
  vectorSource: VectorSource<Geometry>
): VectorLayer<any> {
  return new VectorLayer({
    source: vectorSource,
    style: new Style({
      image: new Icon({
        anchor: [0, 0],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: './brique.png',
        scale: 0.75,
      }),
    }),
  })
}

function addMapClickEventListener(
  map: Map,
  onSelectedLocation: (location: ContentfulLocation) => void,
  onHoveringLocation: (location?: ContentfulLocation) => void
) {
  const clickHandler = (event: MapBrowserEvent<UIEvent>) => {
    const pixel = event.pixel
    const feature = map.forEachFeatureAtPixel(pixel, (feature) => {
      return feature
    })
    if (feature) {
      // const info = `#${feature.get('id')}: ${feature.get('name')}`;
      onSelectedLocation(feature.get('locationObj'))
    }
  }

  const hoverHandler = (event: MapBrowserEvent<UIEvent>) => {
    const pixel = event.pixel
    const feature = map.forEachFeatureAtPixel(pixel, (feature) => {
      return feature
    })
    if (feature) {
      return onHoveringLocation(feature.get('locationObj'))
    }
    onHoveringLocation(undefined)
  }

  map.on('click', clickHandler)
  map.on('pointermove', hoverHandler)
}

function spawnLocationsOnMap(
  map: Map,
  locations: ContentfulLocation[],
  selectedLocation?: GqlLocation
) {
  const markers = generateMarkersFromLocations(locations)

  const markersVectorSource = new VectorSource({ features: markers })
  const markerVectorLayer = getMarkerStyle(markersVectorSource)

  map.addLayer(markerVectorLayer)
}

let map: Map | undefined = undefined

export default function createMap({
  mapRef,
  locations,
  onSelectedLocation,
  onHoveringLocation,
  mapCenter,
}: {
  mapRef: React.RefObject<HTMLDivElement>
  locations: ContentfulLocation[]
  onSelectedLocation: (location: ContentfulLocation) => void
  onHoveringLocation: (location?: ContentfulLocation) => void
  mapCenter?: GqlLocation
}) {
  if (!mapRef.current) return

  if (!mapCenter) {
    map = initMap(mapRef.current.id)
  } else {
    const { address } = mapCenter
    const aim = {
      gps_longitude: address.gps_longitude,
      gps_latitude: address.gps_latitude,
    }

    map = initMap(mapRef.current.id, {
      center: aim,
      zoom: 6.25,
    })
  }

  spawnLocationsOnMap(map, locations, mapCenter)
  addMapClickEventListener(map, onSelectedLocation, onHoveringLocation)

  return map
}
