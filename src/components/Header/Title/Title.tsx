import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface PropsType {
  title?: string
  mainTitlePicture?: { url: string } | null
}

export default function Title({ title, mainTitlePicture }: PropsType) {
  if (mainTitlePicture)
    return (
      <Link href={`/`}>
        <h1 style={{ visibility: 'hidden', opacity: 0, scale: 0 }}>{title}</h1>
        <Image
          style={{ cursor: 'pointer' }}
          src={mainTitlePicture.url}
          alt="site title"
          width={688}
          height={162}
          role="h1"
        />
      </Link>
    )

  if (title)
    return (
      <Link href={`/`}>
        <div
          style={{
            textAlign: 'center',
            paddingTop: '0.5rem',
            cursor: 'pointer',
          }}
        >
          <h1
            style={{
              textTransform: 'uppercase',
              fontWeight: 100,
            }}
          >
            {title}
          </h1>
        </div>
      </Link>
    )
  return <></>
}
