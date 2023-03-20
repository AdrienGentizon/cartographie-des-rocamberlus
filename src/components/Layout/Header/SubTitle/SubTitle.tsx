import React from 'react'
import useHomePage from '../../../../graphql/useHomePage'
import isDesktop from '../../../../utils/isDesktop'

function Image({ url }: { url: string }) {
  return (
    <img
      style={{
        padding: isDesktop() ? '0 6rem' : '0 1rem',
        margin: '0 auto',
      }}
      src={url}
      alt="site title"
    />
  )
}

export default function SubTitle() {
  const { homePage } = useHomePage()

  if (!homePage) return <></>
  if (homePage.subTitlePicture)
    return <Image url={homePage.subTitlePicture.url} />

  return <></>
}
