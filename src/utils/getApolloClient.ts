import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client'

import { onError } from '@apollo/client/link/error'

let client: ApolloClient<NormalizedCacheObject> | undefined = undefined

export default function getApolloClient(): ApolloClient<NormalizedCacheObject> {
  if (!client) {
    console.log(import.meta.env.VITE_CONTENTFUL_GRAPHQL_ENDPOINT)
    const httpLink = createHttpLink({
      uri: `${import.meta.env.VITE_CONTENTFUL_GRAPHQL_ENDPOINT}/${
        import.meta.env.VITE_CONTENTFUL_SPACE_ID
      }`,
      headers: {
        authorization: `Bearer ${import.meta.env.VITE_CONTENTFUL_API_KEY}`,
        'Content-Language': 'en-us',
      },
      fetchOptions: {
        credentials: 'same-origin',
      },
    })

    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        )

      if (networkError) console.error(`[Network error]: ${networkError}`)
    })

    client = new ApolloClient({
      link: from([errorLink, httpLink]),
      cache: new InMemoryCache({}),
    })
  }
  return client
}
