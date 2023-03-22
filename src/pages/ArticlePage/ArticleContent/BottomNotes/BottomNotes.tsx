import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'

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
      <div>{children}</div>
    </>
  )
}

export default function BottomNotes({ article }: PropsType) {
  const renderOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
        return (
          <p className="text-sm lg:text-base lg:font-extralight font-light  pb-3  text-justify whitespace-pre-wrap">
            {children}
          </p>
        )
      },
    },
  }
  return (
    <>
      {article.articleReferences && (
        <Section icon="🚗" title="Quelques références">
          {documentToReactComponents(
            article.articleReferences.json,
            renderOptions
          )}
        </Section>
      )}
      {article.articleWebography && (
        <Section icon="💻" title="Webographie">
          {documentToReactComponents(
            article.articleWebography.json,
            renderOptions
          )}
        </Section>
      )}
      {article.articleAvDocuments && (
        <Section icon="🎥" title="Documents audiovisuels">
          {documentToReactComponents(
            article.articleAvDocuments.json,
            renderOptions
          )}
        </Section>
      )}
    </>
  )
}
