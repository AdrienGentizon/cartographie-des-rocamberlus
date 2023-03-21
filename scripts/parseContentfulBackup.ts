import { readFile } from 'fs/promises'

type Field<T = string> = {
  'en-US': T
}

type ArticleFields = {
  title: Field
  articleAuthor: Field
  coverPicture: Field<{ sys: unknown }>
  artistName: Field
  artistPicture: Field<{ sys: unknown }>
  articleText: Field<{ data: unknown; content: unknown[]; nodeType: string }>
  locationCountry: Field
  locationName: Field
  locationGpsCoordinates: Field<{ lon: number; lat: number }>
  visitDate: Field
}

type Entry = {
  metadata: { tags: any[] }
  sys: unknown & { id: string }
  fields: Partial<ArticleFields>
}

type RawBackup = {
  tags: unknown[]
  entries: Entry[]
  assets: unknown[]
  webhooks?: unknown[]
  roles?: unknown[]
}

async function run() {
  try {
    const data = JSON.parse(
      (await readFile('./_contentful/export.json', {
        encoding: 'utf-8',
      })) as unknown as string
    ) as unknown as RawBackup
    data.entries.forEach((e) => console.log(e.fields.title))
  } catch (error) {
    console.error(error)
  }
}

run()
