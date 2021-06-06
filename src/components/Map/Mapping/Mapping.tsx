import React, { useEffect, useRef, useState } from 'react';
import createMap from '../../../mapping/createMap';
import { GqlLocation } from '../../../types';

interface MappingProps {
  locations: GqlLocation[];
  center?: GqlLocation;
}

interface MapBuilderProps {
  mapRef: React.RefObject<HTMLDivElement>;
  locations: GqlLocation[];
  infoHandler: {
    infoRef: React.RefObject<HTMLDivElement>;
    setInfo: React.Dispatch<React.SetStateAction<string>>;
  };
  center?: GqlLocation;
}

function MapBuilder({
  mapRef,
  locations,
  infoHandler,
  center,
}: MapBuilderProps) {
  useEffect(() => {
    const map = createMap({
      mapRef,
      locations,
      infoHandler,
      center,
    });
    return () => map?.dispose();
    // eslint-disable-next-line
  }, []);

  return <></>;
}

export default function Mapping({ locations, center }: MappingProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [info, setInfo] = useState('');
  const infoHandler = { infoRef, setInfo };

  return (
    <div className="Mapping">
      <div id="side" className="Mapping__side"></div>
      <div id="map" className="Mapping__map" ref={mapRef}>
        {mapRef && (
          <MapBuilder
            mapRef={mapRef}
            locations={locations}
            infoHandler={infoHandler}
            center={center}
          />
        )}
      </div>
      <div id="info" className="Mapping__info" ref={infoRef}>
        <p>{info}</p>
      </div>
    </div>
  );
}
