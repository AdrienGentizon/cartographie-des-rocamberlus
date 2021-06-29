import React from 'react';

import { GqlLocation } from '../../../types';

interface SelectedLocationProps {
  location: GqlLocation;
}
export default function SelectedLocation({ location }: SelectedLocationProps) {
  return (
    <div className="py-4 bg-gray-100 border-b border-gray-200 text-sm text-left px-4">
      <h3 className="">nom: {location.name}</h3>
      <p>description: {location.description}</p>
      <ul className="">
        <li>
          adresse: {location.address.street_number},{' '}
          {location.address.street_name}, {location.address.zipcode},{' '}
          {location.address.city}, {location.address.country}
        </li>
        <li>
          coordonnées gps: {location.address.gps_longitude},{' '}
          {location.address.gps_latitude}
        </li>
      </ul>
    </div>
  );
}
