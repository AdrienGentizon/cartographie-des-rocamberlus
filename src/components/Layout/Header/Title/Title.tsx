import React from 'react'
import useHomePage from '../../../../contentful/useHomePage'
import { H1 } from '../../../../ui'

function Image({ url }: { url: string }) {
  return <img className="py-8" src={url} alt="site title" />
}

export default function Title() {
  const { homePage } = useHomePage()

  if (!homePage) return <></>
  if (homePage.mainTitlePicture)
    return <Image url={homePage.mainTitlePicture.url} />

  if (homePage.title)
    return (
      <div className="text-center pt-4 pb-2">
        <H1>{homePage.title}</H1>
      </div>
    )
  return <></>
}
