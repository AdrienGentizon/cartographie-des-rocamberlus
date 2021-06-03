import Map from 'ol/Map';
import View from 'ol/View';
import XYZ from 'ol/source/XYZ';
import * as olProj from 'ol/proj';
import Feature from 'ol/Feature';
import { Geometry, Point } from 'ol/geom';
import VectorSource from 'ol/source/Vector';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

import { GpsCoordinates, Location } from '../queries/types';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import { GqlLocation } from '../types';

const FRANCE_COORDINATES: GpsCoordinates = {
  gps_longitude: 2.3632841,
  gps_latitude: 47.0780911,
}; // Bourges gps coordinates

interface CreateMapOptions {
  center: GpsCoordinates;
  zoom: number;
}

function initMap(options?: CreateMapOptions) {
  const _options: CreateMapOptions = options
    ? { ...options }
    : { center: FRANCE_COORDINATES, zoom: 6.25 };

  return new Map({
    target: 'map',
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

function addMapClickEventListener(
  map: Map,
  infoHandler: {
    infoRef: React.RefObject<HTMLDivElement>;
    setInfo: React.Dispatch<React.SetStateAction<string>>;
  }
) {
  const { infoRef, setInfo } = infoHandler;
  const clickHandler = (event: MapBrowserEvent<UIEvent>) => {
    const pixel = event.pixel;
    const feature = map.forEachFeatureAtPixel(pixel, (feature) => {
      return feature;
    });
    if (feature && infoRef.current) {
      infoRef.current.style.left = `${pixel[0]}px`;
      infoRef.current.style.top = `${pixel[1]}px`;
      infoRef.current.style.display = 'block';
      const info = `#${feature.get('id')}: ${feature.get('name')}`;
      setInfo(info);
    }
    if (!feature && infoRef.current) infoRef.current.style.display = 'none';
  };

  map.on('click', clickHandler);
}

let map: Map | undefined = undefined;

export default function createMap({
  locations,
  infoHandler,
  center,
}: {
  locations: GqlLocation[];
  infoHandler: {
    infoRef: React.RefObject<HTMLDivElement>;
    setInfo: React.Dispatch<React.SetStateAction<string>>;
  };
  center?: GqlLocation;
}) {
  if (!map) {
    if (!center) {
      map = initMap();
    } else {
      const { address } = center;
      const aim = {
        gps_longitude: address.gps_longitude,
        gps_latitude: address.gps_latitude,
      };

      map = initMap({
        center: aim,
        zoom: 6.25,
      });
    }
  }

  const markers = generateMarkersFromLocations(locations);

  const vectorSource = new VectorSource({ features: markers });

  const markerVectorLayer = getMarkerStyle(vectorSource);

  map.addLayer(markerVectorLayer);

  addMapClickEventListener(map, infoHandler);
}
