import React from 'react'
import useHomePage from '../../../../graphql/useHomePage'
import isDesktop from '../../../../utils/isDesktop'

function Image({ url }: { url: string }) {
  return <img src={url} alt="site title" />
}

export default function Title() {
  const { homePage } = useHomePage()

  const fontSize: React.CSSProperties = isDesktop()
    ? {
        fontSize: '2.25rem',
        lineHeight: '2.5rem',
      }
    : {
        fontSize: '1.875rem',
        lineHeight: '2.25rem',
      }
  if (!homePage) return <></>
  if (homePage.mainTitlePicture)
    return <Image url={homePage.mainTitlePicture.url} />

  if (homePage.title)
    return (
      <div
        style={{
          textAlign: 'center',
          paddingTop: '0.5rem',
        }}
      >
        <h1
          style={{
            ...fontSize,
            textTransform: 'uppercase',
            fontWeight: 100,
          }}
        >
          {homePage.title}
        </h1>
      </div>
    )
  return <></>
}
