import { ApolloError, gql, useQuery } from '@apollo/client'
import { HomePageType } from '../types'
import { PAGES } from '../utils/entriesIds'
import { Document } from '@contentful/rich-text-types/dist/types/types'

type ContactPage = {
  message: {
    json: Document
  }
}
type RawContactPage = Partial<ContactPage>

const ContactPageFramgent = gql`
  fragment ContactPageFramgent on ContactPage {
    message {
      json
    }
  }
`

const GET_CONTACT_PAGE_QUERY = gql`
  ${ContactPageFramgent}
  query getContactPage {
    contactPage(id: "${PAGES.contact}") {
      ...ContactPageFramgent
    }
  }
`

function isValidContactPage(raw: RawContactPage | null): raw is ContactPage {
  return Boolean(raw?.message && raw.message.json.content.length > 0)
}

export default function useContactPage(): {
  contactPage?: ContactPage
  loading: boolean
  error?: ApolloError
} {
  const { data, loading, error } = useQuery<{ contactPage: RawContactPage }>(
    GET_CONTACT_PAGE_QUERY
  )

  return {
    contactPage:
      data && isValidContactPage(data.contactPage)
        ? data?.contactPage
        : undefined,
    loading,
    error,
  }
}
