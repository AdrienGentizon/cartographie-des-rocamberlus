import React, { useEffect, useRef, useState } from 'react';
import createMap from '../../../mapping/createMap';
import { GqlLocation } from '../../../types';

interface MappingProps {
  locations: GqlLocation[];
  center?: GqlLocation;
}

export default function Mapping({ locations, center }: MappingProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [info, setInfo] = useState('');
  const infoHandler = { infoRef, setInfo };

  useEffect(() => {
    if (mapRef.current && infoRef.current) {
      createMap({
        locations,
        infoHandler,
        center,
      });
    }
    // eslint-disable-next-line
  }, [mapRef, locations, infoRef]);

  return (
    <div className="Mapping">
      <div id="side" className="Mapping__side"></div>
      <div id="map" className="Mapping__map" ref={mapRef}></div>
      <div id="info" className="Mapping__info" ref={infoRef}>
        <p>{info}</p>
      </div>
    </div>
  );
}
