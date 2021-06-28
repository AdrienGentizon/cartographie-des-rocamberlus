import { useEffect } from 'react';

import useGetLocations from '../../queries/useGetLocations';

import Mapping from './Mapping/Mapping';

interface MapProps {
  id: string;
}

export default function Map({ id }: MapProps) {
  const { data, error } = useGetLocations({ page: 1, size: 100 });

  useEffect(() => {
    if (error) return console.error(error.message);
  }, [data, error]);

  if (error)
    return (
      <main className="flex flex-col text-center flex-1">
        <h3>Carte</h3>
        <p className="text-red-500">Oups something went wrong</p>
      </main>
    );

  return (
    <main className="flex flex-col text-center flex-1">
      <h3 className="py-8 text-xl font-thin">
        Environnements et jardins singuliers
      </h3>
      {data && data.locations && (
        <Mapping locations={data.locations.locations} />
      )}
    </main>
  );
}
