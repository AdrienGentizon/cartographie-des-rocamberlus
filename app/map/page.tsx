import { Metadata } from "next";

import getLocations from "../../queries/getLocations";
import MapPage from "./components/MapPage";

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.cartographie-des-rocamberlus.com/map/`,
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
