import React from "react";

import { Metadata } from "next";

import Header from "@/components/Header/Header";
import { Main } from "@/components/Main/Main";
import getAssetsCollection from "@/queries/getAssetsCollection";
import getHeaderContent from "@/utils/getHeaderContent";
import getHomePageContent from "@/utils/getHomePageContent";

import Container from "../components/Container/Container";
import Loader from "../components/Link/Loader/Loader";
import StorageProvider from "../components/contexts/StorageContext";
import { ASSETS } from "../utils/assetsIds";
import "./globals.css";

async function getAssets() {
  return getAssetsCollection(Object.values(ASSETS));
}

export const metadata: Metadata = {
  title: "Cartographie des rocamberlus",
  description: "La cartographie des environnements d'art singulier",
  alternates: {
    canonical: `https://www.cartographie-des-rocamberlus.com/`,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const assets = await getAssets();
  const { homePage } = await getHomePageContent();
  const header = await getHeaderContent();

  return (
    <html lang="fr">
      <StorageProvider>
        <body>
          <Container assets={assets}>
            <Header
              title={homePage?.title === null ? undefined : homePage?.title}
              mainTitlePicture={homePage?.mainTitlePicture}
              assets={header.assets}
            />
            <Main>{children}</Main>
          </Container>
          <Loader />
        </body>
      </StorageProvider>
    </html>
  );
}
