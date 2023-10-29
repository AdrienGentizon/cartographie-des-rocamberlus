import StadiaMaps from 'ol/source/StadiaMaps'
import * as olProj from 'ol/proj'
import Feature from 'ol/Feature'
import { Circle, Geometry, Point } from 'ol/geom'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import { Fill, Icon, Stroke, Style } from 'ol/style'

import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'

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

  const layer = new TileLayer({
    source: new StadiaMaps({
      layer: 'stamen_toner_background',
      apiKey: process.env.STADIA_API_KEY ?? '',
      retina: true,
    }),
  })

  const view = new View({
    center: olProj.fromLonLat([
      _options.center.gps_longitude,
      _options.center.gps_latitude,
    ]),
    zoom: _options.zoom,
  })

  const map = new Map({
    layers: [layer],
    view,
    target: mapId,
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

function getLocationsStyle(
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

function getVisitedLocationsStyle(
  vectorSource: VectorSource<Geometry>
): VectorLayer<any> {
  return new VectorLayer({
    source: vectorSource,
    style: new Style({
      image: new Icon({
        anchor: [0, 0],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: './brique-desat.png',
        scale: 0.75,
      }),
    }),
  })
}

function getNewArticlesStyle(
  vectorSource: VectorSource<Geometry>
): VectorLayer<any> {
  return new VectorLayer({
    source: vectorSource,
    style: new Style({
      image: new Icon({
        anchor: [0, 0],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: './star.svg',
        scale: 0.5,
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

function spawnLocationsOnMap(map: Map, locations: ContentfulLocation[]) {
  const showNewArticleBadge = false
  const showVisitedLocationBadge = false
  const locationsMarkers = generateMarkersFromLocations(locations)
  const visitedLocationsMarkers = generateMarkersFromLocations(
    locations.filter(() => showVisitedLocationBadge)
  )
  const newArticlesMarkers = generateMarkersFromLocations(
    locations.filter(() => showNewArticleBadge)
  )

  const locationsVectorSource = new VectorSource({ features: locationsMarkers })
  const visitedLocationsVectorSource = new VectorSource({
    features: visitedLocationsMarkers,
  })
  const newArticlesVectorSource = new VectorSource({
    features: newArticlesMarkers,
  })
  const locationsVectorLayer = getLocationsStyle(locationsVectorSource)
  const visitedLocationsVectorLayer = getVisitedLocationsStyle(
    visitedLocationsVectorSource
  )
  const newArticlesVectorLayer = getNewArticlesStyle(newArticlesVectorSource)

  map.addLayer(locationsVectorLayer)
  map.addLayer(visitedLocationsVectorLayer)
  map.addLayer(newArticlesVectorLayer)
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

  spawnLocationsOnMap(map, locations)
  addMapClickEventListener(map, onSelectedLocation, onHoveringLocation)

  return map
}
