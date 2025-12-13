import * as contentful from "contentful";

let client: contentful.ContentfulClientApi<undefined> | undefined = undefined;

export default function getContentfulClient() {
  if (!client) {
    client = contentful.createClient({
      space: process.env.CONTENTFUL_SPACE_ID ?? "",
      // environment: '<environment_id>', // defaults to 'master' if not set
      accessToken: process.env.CONTENTFUL_API_KEY ?? "",
    });
  }

  return client;
}
