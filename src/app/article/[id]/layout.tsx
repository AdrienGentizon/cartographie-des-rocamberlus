import React from 'react'
import { Main } from '@/components/Main/Main'
import Header from '@/components/Header/Header'
import getHeaderContent from '@/utils/getHeaderContent'
import getHomePageContent from '@/utils/getHomePageContent'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { homePage } = await getHomePageContent()
  const header = await getHeaderContent()
  return (
    <>
      <Header
        title={homePage?.title === null ? undefined : homePage?.title}
        mainTitlePicture={homePage?.mainTitlePicture}
        artists={header.artists}
        assets={header.assets}
        asSearch
      />{' '}
      <Main>{children}</Main>
    </>
  )
}
