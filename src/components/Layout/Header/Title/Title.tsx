import React from 'react'
import { useHistory } from 'react-router-dom'
import useHomePage from '../../../../graphql/useHomePage'
import isDesktop from '../../../../utils/isDesktop'

function Image({ url, onClick }: { url: string; onClick: () => void }) {
  return (
    <img
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      src={url}
      alt="site title"
    />
  )
}

export default function Title() {
  const history = useHistory()

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
    return (
      <Image
        onClick={() => history.push('/')}
        url={homePage.mainTitlePicture.url}
      />
    )

  if (homePage.title)
    return (
      <div
        style={{
          textAlign: 'center',
          paddingTop: '0.5rem',
          cursor: 'pointer',
        }}
        onClick={() => history.push('/')}
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
