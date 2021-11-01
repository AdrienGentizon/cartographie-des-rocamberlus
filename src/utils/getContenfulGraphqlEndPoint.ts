import getEnv from "./getEnv";

export default function getContentfulGraphqlEndPoint(): string {
  return `${getEnv().REACT_APP_CONTENTFUL_GRAPHQL_ENDPOINT}/${
    getEnv().REACT_APP_CONTENTFUL_SPACE_ID
  }/explore?access_token=${getEnv().REACT_APP_CONTENTFUL_API_KEY}`;
}
