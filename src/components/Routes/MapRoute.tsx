import React from 'react';

import useGetLocations from '../../queries/useGetLocations';

import Map from './../Map/Map';

export default function MapRoute() {
  const { data, error } = useGetLocations({ page: 1, size: 200 });

  if (error)
    return (
      <main className="flex flex-col text-center flex-1">
        <h3>Carte</h3>
        <p className="text-red-500">Oups something went wrong</p>
      </main>
    );

  return (
    <main className="flex flex-col text-center flex-1">
      <h1 className="py-8 text-xl font-normal">
        Environnements et jardins singuliers
      </h1>
      {data && data.locations && <Map locations={data.locations.locations} />}
    </main>
  );
}
