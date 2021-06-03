import { useEffect } from 'react';

import useGetLocations from '../../queries/useGetLocations';

import Mapping from './Mapping/Mapping';

export default function Map() {
  const { data, error } = useGetLocations({ page: 1, size: 100 });

  useEffect(() => {
    if (error) return console.error(error.message);
  }, [data, error]);

  if (error)
    return (
      <div className="Map">
        <h3>Carte</h3>
        <p className="error">Oups something went wrong</p>
      </div>
    );

  return (
    <div className="Map">
      <h3 className="Map__title">Carte</h3>
      {data && data.locations && (
        <p className="Map__sub-title">
          {data.locations.locations.length} environnements et jardins singuliers
        </p>
      )}
      {data && data.locations && (
        <Mapping locations={data.locations.locations} />
      )}
    </div>
  );
}
