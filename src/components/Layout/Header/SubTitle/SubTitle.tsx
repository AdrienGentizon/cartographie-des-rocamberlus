import React from 'react'
import useHomePage from '../../../../contentful/useHomePage'

function Image({ url }: { url: string }) {
  return <img className="w-96 mx-auto" src={url} alt="site title" />
}

export default function SubTitle() {
  const { homePage } = useHomePage()

  if (!homePage) return <></>
  if (homePage.subTitlePicture)
    return <Image url={homePage.subTitlePicture.url} />

  return <></>
}
