import { gql } from "@apollo/client";

export const PictureFragment = gql`
  fragment PictureFragment on Asset {
    title
    description
    contentType
    fileName
    size
    url
    width
    height
  }
`;

export const SysFragment = gql`
  fragment SysFragment on Sys {
    id
    spaceId
    environmentId
    publishedAt
    firstPublishedAt
    publishedVersion
  }
`;
