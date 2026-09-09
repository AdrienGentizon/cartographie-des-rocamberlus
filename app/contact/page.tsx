import { Metadata } from "next";

import ContactPage from "@/components/Pages/ContactPage";

import getContactPage from "../../queries/getContactPage";

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.cartographie-des-rocamberlus.com/contact/`,
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
