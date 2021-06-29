import Map from 'ol/Map';
import View from 'ol/View';
import XYZ from 'ol/source/XYZ';
import * as olProj from 'ol/proj';
import Feature from 'ol/Feature';
import { Geometry, Point } from 'ol/geom';
import VectorSource from 'ol/source/Vector';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

import { GpsCoordinates } from '../queries/types';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import { ArtistLocationArticleDocument, GqlLocation } from '../types';

const FRANCE_COORDINATES: GpsCoordinates = {
  gps_longitude: 2.3632841,
  gps_latitude: 47.0780911,
}; // Bourges gps coordinates

interface CreateMapOptions {
  center: GpsCoordinates;
  zoom: number;
}

function initMap(mapId: string, options?: CreateMapOptions) {
  const _options: CreateMapOptions = options
    ? { ...options }
    : { center: FRANCE_COORDINATES, zoom: 6.25 };

  const map = new Map({
    target: mapId,
    layers: [
      new TileLayer({
        source: new XYZ({
          url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
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
  });

  return map;
}

function generateMarkersFromLocations(
  locations: GqlLocation[]
): Feature<Geometry>[] {
  return locations.map(
    (location) =>
      new Feature({
        geometry: new Point(
          olProj.fromLonLat([
            location.address.gps_longitude,
            location.address.gps_latitude,
          ])
        ),
        id: location.id,
        name: location.name,
        description: location.description,
        locationObj: location,
      })
  );
}

function getMarkerStyle(vectorSource: VectorSource<Geometry>): VectorLayer {
  return new VectorLayer({
    source: vectorSource,
    style: new Style({
      image: new CircleStyle({
        radius: 8,
        fill: new Fill({ color: 'hsla(343, 100%, 50%, 0.5)' }),
        stroke: new Stroke({ color: 'hsl(343, 100%, 50%)', width: 1 }),
      }),
    }),
  });
}

function getLocationWithArticleStyle(
  vectorSource: VectorSource<Geometry>
): VectorLayer {
  return new VectorLayer({
    source: vectorSource,
    style: new Style({
      image: new CircleStyle({
        radius: 8,
        fill: new Fill({ color: 'hsla(126, 100%, 50%, 0.5)' }),
        stroke: new Stroke({ color: 'hsl(126, 100%, 50%)', width: 1 }),
      }),
    }),
  });
}

function getSelectedLocationStyle(
  vectorSource: VectorSource<Geometry>
): VectorLayer {
  return new VectorLayer({
    source: vectorSource,
    style: new Style({
      image: new CircleStyle({
        radius: 8,
        fill: new Fill({ color: 'hsla(58, 100%, 50%, 0.5)' }),
        stroke: new Stroke({ color: 'hsl(58, 100%, 50%)', width: 1 }),
      }),
    }),
  });
}

function addMapClickEventListener(
  map: Map,
  onSelectedLocation: (location: GqlLocation) => void
) {
  const clickHandler = (event: MapBrowserEvent<UIEvent>) => {
    const pixel = event.pixel;
    const feature = map.forEachFeatureAtPixel(pixel, (feature) => {
      return feature;
    });
    if (feature) {
      // const info = `#${feature.get('id')}: ${feature.get('name')}`;
      onSelectedLocation(feature.get('locationObj'));
    }
  };

  map.on('click', clickHandler);
}

function spawnLocationsOnMap(
  map: Map,
  locations: GqlLocation[],
  artistLocationArticles: ArtistLocationArticleDocument[],
  selectedLocation?: GqlLocation
) {
  const locationsWithoutArticle = locations.filter((location) =>
    artistLocationArticles.find(
      (article) => article.data.id_location === +location.id
    )
      ? undefined
      : location
  );
  const locationsWithArticle = locations.filter((location) =>
    artistLocationArticles.find(
      (article) => article.data.id_location === +location.id
    )
      ? location
      : undefined
  );
  const markers = generateMarkersFromLocations(locationsWithoutArticle);
  const articles = generateMarkersFromLocations(locationsWithArticle);

  const markersVectorSource = new VectorSource({ features: markers });
  const markerVectorLayer = getMarkerStyle(markersVectorSource);

  const articlesVectorSource = new VectorSource({ features: articles });
  const articlesVectorLayer = getLocationWithArticleStyle(articlesVectorSource);

  map.addLayer(markerVectorLayer);
  map.addLayer(articlesVectorLayer);

  if (selectedLocation) {
    const selected = generateMarkersFromLocations([selectedLocation]);
    const selectedLocationVectorSource = new VectorSource({
      features: selected,
    });
    const selectedLocationVectorLayer = getSelectedLocationStyle(
      selectedLocationVectorSource
    );
    map.addLayer(selectedLocationVectorLayer);
  }
}

let map: Map | undefined = undefined;

export default function createMap({
  mapRef,
  locations,
  onSelectedLocation,
  artistLocationArticles,
  mapCenter,
}: {
  mapRef: React.RefObject<HTMLDivElement>;
  locations: GqlLocation[];
  onSelectedLocation: (location: GqlLocation) => void;
  artistLocationArticles: ArtistLocationArticleDocument[];
  mapCenter?: GqlLocation;
}) {
  if (!mapRef.current) return;

  if (!mapCenter) {
    map = initMap(mapRef.current.id);
  } else {
    const { address } = mapCenter;
    const aim = {
      gps_longitude: address.gps_longitude,
      gps_latitude: address.gps_latitude,
    };

    map = initMap(mapRef.current.id, {
      center: aim,
      zoom: 6.25,
    });
  }

  spawnLocationsOnMap(map, locations, artistLocationArticles, mapCenter);
  addMapClickEventListener(map, onSelectedLocation);

  return map;
}
