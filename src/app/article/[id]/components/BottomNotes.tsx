import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'

import React from 'react'
import { ContentfulAsset, ValidArticle } from '../../../../types'
import Image from 'next/image'

interface PropsType {
  article: ValidArticle
  icons: {
    references: ContentfulAsset | undefined
    webography: ContentfulAsset | undefined
    media: ContentfulAsset | undefined
  }
}

interface SectionPropsType {
  title: string
  icon: ContentfulAsset | undefined
}

function Section({
  title,
  icon,
  children,
}: React.PropsWithChildren<SectionPropsType>) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {icon ? (
        <Image
          src={icon.url}
          style={{
            scale: 0.5,
            transformOrigin: 'left',
          }}
          width={icon.width}
          height={icon.height}
          alt={icon.description ?? ''}
        />
      ) : (
        <p
          style={{
            textDecoration: 'underline',
          }}
        >
          {title}:
        </p>
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default function BottomNotes({ article, icons }: PropsType) {
  const renderOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
        return (
          <p className="text-sm lg:text-base lg:font-extralight text-left font-light not-italic">
            {children}
          </p>
        )
      },
      [INLINES.HYPERLINK]: (node: any, children: any) => {
        return (
          <a
            className="underline cursor-pointer text-gray-500 hover:text-gray-800 text-sm"
            target="_blank"
            href={node.data.uri}
            rel="noreferrer"
          >
            {children}
          </a>
        )
      },
    },
  }
  return (
    <ul
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {article.articleReferences && (
        <li>
          <Section icon={icons.references} title="Quelques références">
            {documentToReactComponents(
              article.articleReferences.json,
              renderOptions
            )}
          </Section>
        </li>
      )}
      {article.articleWebography && (
        <li>
          <Section icon={icons.webography} title="Webographie">
            {documentToReactComponents(
              article.articleWebography.json,
              renderOptions
            )}
          </Section>
        </li>
      )}
      {article.articleAvDocuments && (
        <li>
          <Section icon={icons.media} title="Documents audiovisuels">
            {documentToReactComponents(
              article.articleAvDocuments.json,
              renderOptions
            )}
          </Section>
        </li>
      )}
    </ul>
  )
}
