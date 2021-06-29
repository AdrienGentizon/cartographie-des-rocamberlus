import React, { useRef, useState } from 'react';

import { ArtistLocationArticleDocument, GqlLocation } from '../../types';

import ArtistLocationArticle from './ArtistLocationArticle/ArtistLocationArticle';
import SelectedLocation from './SelectedLocation/SelectedLocation';
import MapBuilder from './MapBuilder/MapBuilder';
import SearchBox from './SearchBox/SearchBox';
import useGetBlogArticles from '../../queries/useGetBlogArticles';

interface MapProps {
  locations: GqlLocation[];
  center?: GqlLocation;
}

export default function Map({ locations }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  const [selectedLocation, setSelectedLocation] = useState<
    GqlLocation | undefined
  >(undefined);

  const [selectedArticle, setSelectedArticle] = useState<
    ArtistLocationArticleDocument | undefined
  >(undefined);

  const [mapCenter, setMapCenter] = useState<GqlLocation | undefined>(
    undefined
  );

  const { data: artistLocationArticles } = useGetBlogArticles();

  const onSelectedLocation = (location: GqlLocation) => {
    setSelectedLocation(location);
    setMapCenter(location);
    if (!artistLocationArticles) return;
    if (
      !artistLocationArticles.find(
        (article) => article.data.id_location === +location.id
      )
    )
      return setSelectedArticle(undefined);
    setSelectedArticle(
      artistLocationArticles.find(
        (article) => article.data.id_location === +location.id
      )
    );
  };

  return (
    <div className="">
      <SearchBox onSelectedLocation={onSelectedLocation} />
      <div id="map" className="w-full h-96" ref={mapRef}>
        {mapRef && artistLocationArticles && (
          <MapBuilder
            mapRef={mapRef}
            locations={locations}
            onSelectedLocation={onSelectedLocation}
            artistLocationArticles={artistLocationArticles}
            mapCenter={mapCenter}
          />
        )}
      </div>
      {selectedLocation && <SelectedLocation location={selectedLocation} />}
      {!selectedLocation && (
        <div className="pt-2 text-sm italic text-gray-500">
          <p>Veuillez clicker sur une position de la carte.</p>
          <p>Les positions vertes contiennent un article.</p>
        </div>
      )}
      {selectedLocation && !selectedArticle && (
        <div className="pt-2 text-sm italic text-gray-500">
          <p>Nous n'avons pas d'article sur ce site pour le moment</p>
        </div>
      )}
      {selectedArticle && <ArtistLocationArticle article={selectedArticle} />}
    </div>
  );
}
