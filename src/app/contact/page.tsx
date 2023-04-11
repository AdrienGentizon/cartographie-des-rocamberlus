import ContactPage from '@/app/contact/ContactPage'
import getContactPage from '@/queries/getContactPage'

async function getContactPageContent() {
  const { contactPage, error } = await getContactPage()
  return { contactPage, error }
}

export default async function Contact() {
  const { contactPage, error } = await getContactPageContent()
  return <ContactPage contactPage={contactPage} error={error} />
}
