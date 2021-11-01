import React, { useEffect } from "react";

import createMap from "../../../mapping/createMap";
import { GqlLocation, ContentfulLocation } from "../../../types";

interface MapBuilderProps {
  mapRef: React.RefObject<HTMLDivElement>;
  locations: ContentfulLocation[];
  onSelectedLocation: (location: ContentfulLocation) => void;
  mapCenter?: GqlLocation;
}

export default function MapBuilder({
  mapRef,
  locations,
  onSelectedLocation,
  mapCenter,
}: MapBuilderProps) {
  useEffect(() => {
    const map = createMap({
      mapRef,
      locations: locations.filter(
        (location: ContentfulLocation) =>
          location.locationGpsCoordinates?.lon &&
          location.locationGpsCoordinates?.lat
      ),
      onSelectedLocation,
      mapCenter,
    });
    return () => map?.dispose();
    // eslint-disable-next-line
  }, [mapCenter]);

  return <></>;
}
