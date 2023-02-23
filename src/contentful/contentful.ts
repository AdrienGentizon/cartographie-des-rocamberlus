import * as contentful from 'contentful'

let client: contentful.ContentfulClientApi | undefined = undefined

export default function getContentfulClient() {
  if (!client) {
    client = contentful.createClient({
      space: import.meta.env.REACT_APP_CONTENTFUL_SPACE_ID,
      // environment: '<environment_id>', // defaults to 'master' if not set
      accessToken: import.meta.env.REACT_APP_CONTENTFUL_API_KEY,
    })
  }

  return client
}
