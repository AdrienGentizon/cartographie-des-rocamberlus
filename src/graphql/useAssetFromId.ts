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
  description: string | null
  fileName: string
  height: number
  width: number
  size: number
  title: string | null
  url: string
}

export default function useImageFromId(
  id: string,
  options?: { width?: number }
): {
  image?: AssetType
  loading: boolean
  error?: ApolloError
} {
  const getQueryOptions = () => {
    if (!options) return { width: 720 }
    if (options.width) {
      if (options.width === -1) return
      return { width: options.width }
    }
    return { width: 720 }
  }
  const { data, error, loading } = useQuery<{ asset?: AssetType }>(
    getImageFromIdQuery(getQueryOptions()),
    {
      variables: { id },
    }
  )

  return {
    image: data?.asset,
    error,
    loading,
  }
}
