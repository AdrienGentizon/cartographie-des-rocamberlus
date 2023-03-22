import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'

import React from 'react'
import { ValidArticle } from '../../../../types'

interface PropsType {
  article: ValidArticle
}

interface SectionPropsType {
  title: string
  icon: string
}

function Section({
  title,
  icon,
  children,
}: React.PropsWithChildren<SectionPropsType>) {
  return (
    <>
      <span
        style={{
          display: 'flex',
          gap: '0.5em',
          paddingBottom: '0.5rem',
        }}
      >
        {icon}
        <p
          style={{
            textDecoration: 'underline',
          }}
        >
          {title}:
        </p>
      </span>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        {children}
      </div>
    </>
  )
}

export default function BottomNotes({ article }: PropsType) {
  const renderOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
        return (
          <p className="text-sm lg:text-base lg:font-extralight font-light text-justify whitespace-pre-wrap not-italic">
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
        gap: '2rem',
      }}
    >
      {article.articleReferences && (
        <li>
          <Section icon="🚗" title="Quelques références">
            {documentToReactComponents(
              article.articleReferences.json,
              renderOptions
            )}
          </Section>
        </li>
      )}
      {article.articleWebography && (
        <li>
          <Section icon="💻" title="Webographie">
            {documentToReactComponents(
              article.articleWebography.json,
              renderOptions
            )}
          </Section>
        </li>
      )}
      {article.articleAvDocuments && (
        <li>
          <Section icon="🎥" title="Documents audiovisuels">
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
