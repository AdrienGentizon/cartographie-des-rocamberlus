export interface Address {
  country: string;
  city: string;
  zipcode: string;
  street_name: string;
  street_number: string;
  gps_longitude: number;
  gps_latitude: number;
}

export interface Location {
  id: number;
  name: string;
  address: Address;
  description?: string;
}

export interface GpsCoordinates {
  gps_longitude: number;
  gps_latitude: number;
}
