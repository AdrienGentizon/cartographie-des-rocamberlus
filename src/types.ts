import { RichTextContent } from 'contentful'

export interface PostalAddress {
  country: string
  city: string
  zipcode: string
  street_name: string
  street_number?: string
}
export interface GpsCoordinates {
  gps_longitude: number
  gps_latitude: number
}

export interface Address extends PostalAddress {
  gps_longitude: number
  gps_latitude: number
}

export interface Location {
  name: string
  address: Address
  description?: string | null
}

export interface GqlLocation extends Location {
  id: string
}
export interface Artist {
  name: string
  pseudo?: string
  date_of_birth?: string
  date_of_death?: string
  biography: string
}

export interface GqlArtist extends Artist {
  id: number
}

export interface Contact {
  first_name: string
  last_name?: string
  phone_number?: string
  email_address?: string
  address?: Address
}

export interface GqlContact extends Contact {
  id: number
}

export interface Pagination {
  total: number
  previous?: number
  current: number
  next?: number
}

export interface Inputs {
  contact_name: string
  contact_email: string
  message: string
}

export interface ContributionFormFetchBody extends Inputs {
  'form-name': 'contribution'
}

export interface ContentfulSys {
  id: string
  __typename: 'Sys'
}

export interface ContentfulAsset {
  title: string
  description: string
  contentType: string
  fileName: string
  size: string
  url: string
  width: string
  height: string
}

export interface ContentfulLocation {
  sys: ContentfulSys
  title: string | null
  locationName: string
  locationDescription: string
  locationCategory: string
  locationCountry: string
  locationZipcode: string
  locationCityName: string
  locationStreetName: string
  locationGpsCoordinates: {
    lat?: number
    lon?: number
  }
  showFullAddress: boolean
  visitDate: string
  locationPicture: ContentfulAsset
  __typename: 'Article'
}

export interface ArtistsHookType {
  artistName: string
  articleId: string
}

export interface HomePageType {
  title?: string | null
  mainTextTitle?: string | null
  mainText?: { json: RichTextContent } | null
  mainTitlePicture?: { url: string } | null
  subTitlePicture?: { url: string } | null
}
