import dotenv from "dotenv";
dotenv.config();

interface Env {
  REACT_APP_FIREBASE_API_KEY: string;
  REACT_APP_FIREBASE_AUTH_DOMAIN: string;
  REACT_APP_FIREBASE_PROJECT_ID: string;
  REACT_APP_FIREBASE_STORAGE_BUCKET: string;
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID: string;
  REACT_APP_FIREBASE_APP_ID: string;

  REACT_APP_APOLLO_SERVER_URI: string;

  REACT_APP_CONTENTFUL_API_KEY: string;
  REACT_APP_CONTENTFUL_SPACE_ID: string;
  REACT_APP_CONTENTFUL_GRAPHQL_ENDPOINT: string;
}

let env: Env | undefined = undefined;

function getEnvVar(
  key: string,
  defaultValue = "",
  shouldThrowIfNotPresent = false
): string {
  if (process.env[key] === undefined && shouldThrowIfNotPresent)
    throw new Error(`🚨 ${key} must be present in your environment`);
  return process.env[key] || defaultValue;
}

export default function getEnv(): Env {
  if (env === undefined) {
    env = {
      REACT_APP_FIREBASE_API_KEY: getEnvVar("REACT_APP_FIREBASE_API_KEY"),
      REACT_APP_FIREBASE_AUTH_DOMAIN: getEnvVar(
        "REACT_APP_FIREBASE_AUTH_DOMAIN"
      ),
      REACT_APP_FIREBASE_PROJECT_ID: getEnvVar("REACT_APP_FIREBASE_PROJECT_ID"),
      REACT_APP_FIREBASE_STORAGE_BUCKET: getEnvVar(
        "REACT_APP_FIREBASE_STORAGE_BUCKET"
      ),
      REACT_APP_FIREBASE_MESSAGING_SENDER_ID: getEnvVar(
        "REACT_APP_FIREBASE_MESSAGING_SENDER_ID"
      ),
      REACT_APP_FIREBASE_APP_ID: getEnvVar("REACT_APP_FIREBASE_APP_ID"),

      REACT_APP_APOLLO_SERVER_URI: getEnvVar(
        "REACT_APP_APOLLO_SERVER_URI",
        "",
        true
      ),

      REACT_APP_CONTENTFUL_API_KEY: getEnvVar(
        "REACT_APP_CONTENTFUL_API_KEY",
        "",
        true
      ),
      REACT_APP_CONTENTFUL_SPACE_ID: getEnvVar(
        "REACT_APP_CONTENTFUL_SPACE_ID",
        "",
        true
      ),
      REACT_APP_CONTENTFUL_GRAPHQL_ENDPOINT: getEnvVar(
        "REACT_APP_CONTENTFUL_GRAPHQL_ENDPOINT",
        "",
        true
      ),
    };
  }
  return env;
}
