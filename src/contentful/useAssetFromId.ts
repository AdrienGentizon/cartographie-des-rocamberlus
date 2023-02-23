import { ApolloError, gql, useQuery } from '@apollo/client'

const getImageFromIdQuery = (options?: { width?: number }) => gql`
  query getAssetFromId($id: String!) {
    asset(id: $id) {
      sys {
        id
      }
      title
      description
      contentType
      fileName
      ${options?.width ? `url(transform: { width: ${options.width} })` : 'url'}
      size
      width
      height
    }
  }
`

interface AssetType {
  contentType: string
  description: string
  fileName: string
  height: number
  width: number
  size: number
  title: string
  url: string
}

export default function useImageFromId(id: string): {
  image?: AssetType
  loading: boolean
  error?: ApolloError
} {
  const { data, error, loading } = useQuery<{ asset?: AssetType }>(
    getImageFromIdQuery({ width: 720 }),
    {
      variables: { id },
    }
  )

  return { image: data?.asset, error, loading }
}
