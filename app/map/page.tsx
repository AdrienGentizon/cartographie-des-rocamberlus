import { Metadata } from "next";

import MapPage from "@/components/Map/MapPage";

import getLocations from "../../queries/getLocations";

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
