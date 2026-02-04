type Env = {
  CONTENTFUL_SPACE_ID: string;
  CONTENTFUL_DELIVERY_API_KEY: string;
  CONTENTFUL_ENVIRONMENT: string;
  CONTENTFUL_WEBHOOK_HEADER_KEY: string;
  CONTENTFUL_WEBHOOK_SECRET: string;
  BASE_URL: string;
};

let envVars: undefined | Env = undefined;

function getEnvVar(key: string, defaultValue = "", required = true) {
  if (required && !process.env[key])
    throw new Error(`[Error] getEnvVar: ${key} is required.`);
  return process.env[key] ?? defaultValue;
}

export default function env() {
  if (!envVars) {
    envVars = {
      CONTENTFUL_SPACE_ID: getEnvVar("CONTENTFUL_SPACE_ID"),
      CONTENTFUL_DELIVERY_API_KEY: getEnvVar("CONTENTFUL_DELIVERY_API_KEY"),
      CONTENTFUL_ENVIRONMENT: getEnvVar("CONTENTFUL_ENVIRONMENT"),
      CONTENTFUL_WEBHOOK_HEADER_KEY: getEnvVar("CONTENTFUL_WEBHOOK_HEADER_KEY"),
      CONTENTFUL_WEBHOOK_SECRET: getEnvVar("CONTENTFUL_WEBHOOK_SECRET"),
      BASE_URL: getEnvVar("BASE_URL"),
    };
  }

  return envVars;
}
