import { gql } from '@apollo/client'

export const SysFragment = gql`
  fragment SysFragment on Sys {
    id
    spaceId
    environmentId
    publishedAt
    firstPublishedAt
    publishedVersion
  }
`
