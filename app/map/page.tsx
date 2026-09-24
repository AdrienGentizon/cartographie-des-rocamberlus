import { Metadata } from "next";

import MapPage from "@/components/Map/MapPage";

import getLocations from "../../queries/getLocations";
import env from "../../utils/env";

export const metadata: Metadata = {
  alternates: {
    canonical: `${env().BASE_URL}/map`,
  },
};

async function getMapLocations() {
  const { locations, error } = await getLocations();
  return { locations, error };
}

export default async function Map() {
  const { locations, error } = await getMapLocations();
  return <MapPage locations={locations} error={error} />;
}
