import * as contentful from 'contentful'

let client: contentful.ContentfulClientApi | undefined = undefined

export default function getContentfulClient() {
  if (!client) {
    client = contentful.createClient({
      space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ?? '',
      // environment: '<environment_id>', // defaults to 'master' if not set
      accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_API_KEY ?? '',
    })
  }

  return client
}
