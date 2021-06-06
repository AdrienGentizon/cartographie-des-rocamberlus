import React, { useEffect, useRef, useState } from 'react';
import createMap from '../../../mapping/createMap';
import { GqlLocation } from '../../../types';

interface MappingProps {
  id: string;
  locations: GqlLocation[];
  center?: GqlLocation;
}

export default function Mapping({ id, locations, center }: MappingProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [info, setInfo] = useState('');
  const infoHandler = { infoRef, setInfo };

  useEffect(() => {
    if (mapRef.current && infoRef.current) {
      createMap({
        mapRef,
        locations,
        infoHandler,
        center,
      });
    }
    // eslint-disable-next-line
  }, [mapRef.current, locations, infoRef.current]);

  return (
    <div className="Mapping">
      <div id="side" className="Mapping__side"></div>
      <div id={id} className="Mapping__map" ref={mapRef}></div>
      <div id="info" className="Mapping__info" ref={infoRef}>
        <p>{info}</p>
      </div>
    </div>
  );
}
