import { ContentfulLocation } from "@/utils/types";

import Map from "./Map";

const MAP_HEADING = "Carte des environnements d'art singulier";

interface PropsType {
  locations: ContentfulLocation[];
  error?: Error;
}

export default function MapPage({ locations, error }: PropsType) {
  if (error) return <p>Error!</p>;

  return (
    <>
      <h1 className="sr-only">{MAP_HEADING}</h1>
      {locations.length > 0 && <Map locations={locations} />}
    </>
  );
}
