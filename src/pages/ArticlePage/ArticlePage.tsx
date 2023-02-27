import React from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import useArticleFromId from '../../contentful/useArticleFromId'
import { H2, Main, Asset, Img } from '../../ui'

import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

function ArticlePage() {
  const { id } = useParams<{ id?: string }>()

  const { loading, error, article } = useArticleFromId(id ?? '')

  const renderOptions = {
    renderNode: {
      [MARKS.BOLD]: (node: any, children: any) => <strong>{children}</strong>,
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
        return (
          <p className="text-sm lg:text-base lg:font-extralight font-light  py-2  text-justify">
            {children}
          </p>
        )
      },
      [BLOCKS.UL_LIST]: (node: any, children: any) => (
        <ul className="flex flex-col gap-0">{children}</ul>
      ),
      [BLOCKS.LIST_ITEM]: (node: any, children: any) => {
        if (children.props) children.props.isListItem = true
        return <li>{children}</li>
      },
      [INLINES.HYPERLINK]: (node: any, children: any) => (
        <a
          className="underline cursor-pointer"
          target="_blank"
          href={node.data.uri}
          rel="noreferrer"
        >
          {children}
        </a>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node: any, children: any) => {
        if (!node.data.target.sys.id) return <></>
        return <Asset id={node.data.target.sys.id} />
      },
    },
  }

  if (loading)
    return (
      <Main>
        <p>Loading...</p>
      </Main>
    )

  if (error || !article?.articleText?.json)
    return (
      <Main>
        <p>Error!</p>
      </Main>
    )

  return (
    <Main>
      <article className="flex flex-col lg:px-2">
        <div
          className={`
          flex justify-center
          pt-8 pb-4
          `}
        >
          <H2>{article.title}</H2>
        </div>
        <div>
          {article.artistPicture && (
            <Img
              className="lg:max-w-xs lg:float-left lg:mr-8 "
              alt="artist profile"
              src={`${article.artistPicture.url}?w=400`}
            />
          )}
          {documentToReactComponents(article.articleText.json, renderOptions)}
        </div>
      </article>
    </Main>
  )
}

export default function Wrapper() {
  return (
    <Layout>
      <ArticlePage />
    </Layout>
  )
}
