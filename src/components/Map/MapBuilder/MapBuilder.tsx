import React, { useEffect } from 'react';

import createMap from '../../../mapping/createMap';
import { GqlLocation, ArtistLocationArticleDocument } from '../../../types';

interface MapBuilderProps {
  mapRef: React.RefObject<HTMLDivElement>;
  locations: GqlLocation[];
  onSelectedLocation: (location: GqlLocation) => void;
  artistLocationArticles: ArtistLocationArticleDocument[];
  mapCenter?: GqlLocation;
}

export default function MapBuilder({
  mapRef,
  locations,
  onSelectedLocation,
  artistLocationArticles,
  mapCenter,
}: MapBuilderProps) {
  useEffect(() => {
    const map = createMap({
      mapRef,
      locations,
      onSelectedLocation,
      artistLocationArticles,
      mapCenter,
    });
    return () => map?.dispose();
    // eslint-disable-next-line
  }, [artistLocationArticles, mapCenter]);

  return <></>;
}
