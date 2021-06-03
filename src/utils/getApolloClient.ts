import dotenv from 'dotenv';

import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
} from '@apollo/client';

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
  if (!client) {
    client = new ApolloClient({
      uri: getEnvVar('REACT_APP_APOLLO_SERVER_URI'),
      cache: new InMemoryCache(),
    });
  }
  return client;
}
