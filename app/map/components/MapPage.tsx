import { ContentfulLocation } from "../../../utils/types";
import Map from "./Map";

interface PropsType {
  locations: ContentfulLocation[];
  error?: Error;
}

export default function MapPage({ locations, error }: PropsType) {
  if (error) return <p>Error!</p>;

  if (locations.length > 0) return <Map locations={locations} />;
  return <></>;
}
