import { RichTextBlock } from 'prismic-reactjs';

export interface PostalAddress {
  country: string;
  city: string;
  zipcode: string;
  street_name: string;
  street_number?: string;
}
export interface GpsCoordinates {
  gps_longitude: number;
  gps_latitude: number;
}

export interface Address extends PostalAddress {
  gps_longitude: number;
  gps_latitude: number;
}

export interface Location {
  name: string;
  address: Address;
  description?: string | null;
}

export interface GqlLocation extends Location {
  id: string;
}
export interface Artist {
  name: string;
  pseudo?: string;
  date_of_birth?: string;
  date_of_death?: string;
  biography: string;
}

export interface GqlArtist extends Artist {
  id: number;
}

export interface Contact {
  first_name: string;
  last_name?: string;
  phone_number?: string;
  email_address?: string;
  address?: Address;
}

export interface GqlContact extends Contact {
  id: number;
}

export interface Pagination {
  total: number;
  previous?: number;
  current: number;
  next?: number;
}

export interface ArtistLocationArticleDocument {
  id: string;
  uid: string;
  slugs: string[];
  tags: string[];
  data: {
    title: RichTextBlock[];
    id_location: number;
    id_artist: number;
    visited: string;
    text: RichTextBlock[];
    pictures: Array<{ picture: { alt: string; url: 'string' } }>;
  };
}

export interface Inputs {
  contact_name: string;
  contact_email: string;
  message: string;
}

export interface ContributionFormFetchBody extends Inputs {
  'form-name': 'contribution';
}
