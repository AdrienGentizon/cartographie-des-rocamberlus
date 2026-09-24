import { Metadata } from "next";

import ContactPage from "@/components/Pages/ContactPage";

import getContactPage from "../../queries/getContactPage";
import env from "../../utils/env";

export const metadata: Metadata = {
  alternates: {
    canonical: `${env().BASE_URL}/contact`,
  },
  robots: {
    index: false,
  },
};

async function getContactPageContent() {
  const { contactPage, error } = await getContactPage();
  return { contactPage, error };
}

export default async function Contact() {
  const { contactPage, error } = await getContactPageContent();
  return <ContactPage contactPage={contactPage} error={error} />;
}
