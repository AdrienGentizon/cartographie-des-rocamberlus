import ContactPage from '@/app/contact/components/ContactPage'
import getContactPage from '@/queries/getContactPage'

import { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.cartographie-des-rocamberlus.com/contact/`,
  },
  robots: {
    index: false,
  },
}

async function getContactPageContent() {
  const { contactPage, error } = await getContactPage()
  return { contactPage, error }
}

export default async function Contact() {
  const { contactPage, error } = await getContactPageContent()
  return <ContactPage contactPage={contactPage} error={error} />
}
