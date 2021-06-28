import React, { useEffect, useRef, useState } from 'react';
import { useClient } from '../../../contexts/ClientProvider/ClientProvider';
import createMap from '../../../mapping/createMap';
import { ArtistLocationArticleDocument, GqlLocation } from '../../../types';

import Prismic from '@prismicio/client';
import { RichText } from 'prismic-reactjs';

interface MappingProps {
  locations: GqlLocation[];
  center?: GqlLocation;
}

interface MapBuilderProps {
  mapRef: React.RefObject<HTMLDivElement>;
  locations: GqlLocation[];
  onSelectedLocation: (location: GqlLocation) => void;
  artistLocationArticles: ArtistLocationArticleDocument[];
  center?: GqlLocation;
}

function MapBuilder({
  mapRef,
  locations,
  onSelectedLocation,
  artistLocationArticles,
  center,
}: MapBuilderProps) {
  useEffect(() => {
    const map = createMap({
      mapRef,
      locations,
      onSelectedLocation,
      artistLocationArticles,
      center,
    });
    return () => map?.dispose();
    // eslint-disable-next-line
  }, [artistLocationArticles]);

  return <></>;
}

export default function Mapping({ locations, center }: MappingProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  const [selectedLocation, setSelectedLocation] = useState<
    GqlLocation | undefined
  >(undefined);

  const [selectedArticle, setSelectedArticle] = useState<
    ArtistLocationArticleDocument | undefined
  >(undefined);

  const [artistLocationArticles, setArtistLocationArticles] = useState<
    ArtistLocationArticleDocument[]
  >([]);

  const onSelectedLocation = (location: GqlLocation) => {
    setSelectedLocation(location);
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

  const { cms } = useClient();

  useEffect(() => {
    if (cms && locations.length) {
      cms
        .query(
          Prismic.Predicates.at('document.type', 'artist_location_article')
        )
        .then((response) => {
          if (response.results)
            setArtistLocationArticles(
              response.results as ArtistLocationArticleDocument[]
            );
        })
        .catch((error) => console.error(error.message));
    }
  }, [locations, cms]);

  return (
    <div className="">
      <div className=""></div>
      <div id="map" className="w-full h-96" ref={mapRef}>
        {mapRef && (
          <MapBuilder
            mapRef={mapRef}
            locations={locations}
            onSelectedLocation={onSelectedLocation}
            artistLocationArticles={artistLocationArticles}
            center={center}
          />
        )}
      </div>
      {selectedLocation && (
        <div className="py-4 bg-gray-100 border-b border-gray-200 text-sm text-left px-4">
          <h3 className="">nom: {selectedLocation.name}</h3>
          <p>description: {selectedLocation.description}</p>
          <ul className="">
            <li>
              adresse: {selectedLocation.address.street_number},{' '}
              {selectedLocation.address.street_name},{' '}
              {selectedLocation.address.zipcode},{' '}
              {selectedLocation.address.city},{' '}
              {selectedLocation.address.country}
            </li>
            <li>
              coordonnées gps: {selectedLocation.address.gps_longitude},{' '}
              {selectedLocation.address.gps_latitude}
            </li>
          </ul>
        </div>
      )}
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
      {selectedArticle && (
        <article className="">
          <h3 className="text-md py-8">
            {RichText.asText(selectedArticle.data.title)}
          </h3>
          <div className="text-sm flex flex-col gap-6 text-justify px-2">
            {RichText.render(selectedArticle.data.text)}
          </div>
          {selectedArticle.data.pictures.length && (
            <div className="mt-12 border-t border-gray-200">
              <h3 className="py-6 text-md">Les photos</h3>
              <ul className="flex flex-col gap-2">
                {selectedArticle.data.pictures.map((picture, n) => (
                  <li key={`picture-${n}`}>
                    <img src={picture.picture.url} alt="" />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>
      )}
    </div>
  );
}
