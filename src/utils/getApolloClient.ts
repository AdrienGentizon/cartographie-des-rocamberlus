import dotenv from 'dotenv';

import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client';

import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

dotenv.config();

let client: ApolloClient<NormalizedCacheObject> | undefined = undefined;

function getEnvVar(
  key: string,
  defaultValue = '',
  shouldThrowIfNotPresent = false
) {
  if (!process.env[key] && shouldThrowIfNotPresent)
    throw new Error(`${key} must be present in your environment.`);
  return process.env[key] || defaultValue;
}

export default function getApolloClient(): ApolloClient<NormalizedCacheObject> {
  // if (!client) {
  //   client = new ApolloClient({
  //     uri: getEnvVar('REACT_APP_APOLLO_SERVER_URI'),
  //     cache: new InMemoryCache(),
  //   });
  // }
  // return client;
  if (!client) {
    const httpLink = createHttpLink({
      uri: getEnvVar('REACT_APP_APOLLO_SERVER_URI'),
      credentials: 'include',
      fetchOptions: {
        mode: 'cors',
      },
    });

    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );

      if (networkError) console.log(`[Network error]: ${networkError}`);
    });

    const authLink = setContext((_, { headers }) => {
      // const token = localStorage.getItem(getUserCredentialsLocalStorageKey());

      return {
        headers: {
          ...headers,
          'Access-Control-Allow-Origin': '*',
          // authorization: token ? `Bearer ${token}` : '',
        },
      };
    });

    client = new ApolloClient({
      // link: authLink.concat(httpLink),
      link: from([errorLink, authLink.concat(httpLink)]),
      cache: new InMemoryCache({}),
    });
  }
  return client;
}
