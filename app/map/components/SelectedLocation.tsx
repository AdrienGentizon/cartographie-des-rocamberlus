import React from "react";

import { GqlLocation } from "../../../utils/types";

interface SelectedLocationProps {
  location: GqlLocation;
}
export default function SelectedLocation({ location }: SelectedLocationProps) {
  return (
    <div className="border-b border-gray-200 bg-gray-100 px-4 py-4 text-left text-sm">
      <h3 className="">nom: {location.name}</h3>
      <p>description: {location.description}</p>
      <ul className="">
        <li>
          adresse: {location.address.street_number},{" "}
          {location.address.street_name}, {location.address.zipcode},{" "}
          {location.address.city}, {location.address.country}
        </li>
        <li>
          coordonnées gps: {location.address.gps_longitude},{" "}
          {location.address.gps_latitude}
        </li>
      </ul>
    </div>
  );
}
