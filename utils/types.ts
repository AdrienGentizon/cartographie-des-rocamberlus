import { Document } from "@contentful/rich-text-types";

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

export interface Inputs {
  contact_name: string;
  contact_email: string;
  message: string;
}

export interface ContributionFormFetchBody extends Inputs {
  "form-name": "contribution";
}

export interface ContentfulSys {
  id: string;
  __typename: "Sys";
}

export interface ContentfulAsset {
  sys: ContentfulSys;
  title: string | null;
  description: string | null;
  contentType: string;
  fileName: string;
  size: number;
  url: string;
  width: number;
  height: number;
}

export interface ContentfulLocation {
  sys: ContentfulSys;
  title: string | null;
  locationName: string;
  locationDescription: string;
  locationCategory: string;
  locationCountry: string;
  locationZipcode: string;
  locationCityName: string;
  locationStreetName: string;
  locationGpsCoordinates: {
    lat?: number;
    lon?: number;
  };
  showFullAddress: boolean;
  visitDate: string;
  locationPicture: ContentfulAsset;
  taggedAsNew: boolean | null;
  __typename: "Article";
}

export interface ArtistsHookType {
  artistName: string;
  articleId: string;
  articleTitle: string;
}

export interface HomePageType {
  title?: string | null;
  mainTextTitle?: string | null;
  mainText?: { json: Document } | null;
  mainTitlePicture?: {
    url: string;
    title?: string;
    description?: string;
    width: number;
    height: number;
  } | null;
  subTitlePicture?: {
    url: string;
    title?: string;
    description?: string;
    width: number;
    height: number;
  } | null;
}

export interface Article {
  sys: ContentfulSys;
  articleAuthor?: string | null;
  articleText?: {
    json: Document | null;
  } | null;
  articleUrlSource?: string | null;
  artistBirthDate?: string | null;
  artistDescription: string | null;
  artistName?: string | null;
  artistPicture?: {
    sys: ContentfulSys;
    url: string;
    description?: string | null;
    title?: string | null;
  } | null;
  artistPseudo?: string | null;
  coverPicture?: string | null;
  title?: string | null;
  locationName?: string | null;
  locationCityName?: string | null;
  locationZipcode?: string | null;
  locationGpsCoordinates?: { lat: number; lon: number } | null;
  showFullAddress?: boolean | null;
  articleReferences?: { json: Document };
  articleWebography?: { json: Document };
  articleAvDocuments?: { json: Document };
}

export type ValidArticle = Article & { articleText: { json: Document } };

export type ContactPageProps = {
  message: {
    json: Document;
  };
  credits: {
    json: Document;
  };
};
export type RawContactPage = Partial<ContactPageProps>;

export type ReadArticle = {
  id: string;
  lastRead: number;
};

export type Storage = {
  readArticles: ReadArticle[];
};

export type Context = {
  readArticles: ReadArticle[];
  addReadArticle: (article: Article) => void;
};

export type SearchResult = {
  name: string;
  articleId: string;
};
