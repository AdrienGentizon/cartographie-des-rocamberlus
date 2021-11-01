import dotenv from "dotenv";

import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";

import { onError } from "@apollo/client/link/error";
import getEnv from "./getEnv";

dotenv.config();

let client: ApolloClient<NormalizedCacheObject> | undefined = undefined;

export default function getApolloClient(): ApolloClient<NormalizedCacheObject> {
  if (!client) {
    const httpLink = createHttpLink({
      uri: `${getEnv().REACT_APP_CONTENTFUL_GRAPHQL_ENDPOINT}/${
        getEnv().REACT_APP_CONTENTFUL_SPACE_ID
      }`,
      headers: {
        authorization: `Bearer ${getEnv().REACT_APP_CONTENTFUL_API_KEY}`,
        "Content-Language": "en-us",
      },
      fetchOptions: {
        credentials: "same-origin",
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

    client = new ApolloClient({
      link: from([errorLink, httpLink]),
      cache: new InMemoryCache({}),
    });
  }
  return client;
}
