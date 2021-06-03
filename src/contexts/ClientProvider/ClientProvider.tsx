import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { createContext, ReactNode, useContext } from 'react';

import Prismic from '@prismicio/client';
import { DefaultClient } from '@prismicio/client/types/client';

export type Client = ApolloClient<NormalizedCacheObject>;

export interface ClientContextType {
  client: Client;
  cms: DefaultClient;
}

export const ClientContext = createContext<ClientContextType | undefined>(
  undefined
);

export const useClient = () => useContext(ClientContext) as ClientContextType;

interface ClientProviderProps {
  children: ReactNode;
}

export default function ClientProvider({ children }: ClientProviderProps) {
  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
  });

  const apiEndpoint = 'https://carte-brute.cdn.prismic.io/api/v2';
  const accessToken = ''; // This is where you would add your access token for a Private repository
  const cms = Prismic.client(apiEndpoint, { accessToken });

  const value: ClientContextType = { client, cms };

  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  );
}
