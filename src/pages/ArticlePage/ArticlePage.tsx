import React from 'react'
import { useParams } from 'react-router-dom'
import useArticleFromId from '../../contentful/useArticleFromId'
import { H2, P, Main, Asset } from '../../ui'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'

export default function ArticlePage() {
  const { id } = useParams<{ id?: string }>()

  const { loading, error, data } = useArticleFromId(id)

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
        try {
          const Element = ({ children }: any) => (
            <P className="text-justify">{children}</P>
          )
          if (children.length && children.length > 0) {
            if (children === '') return

            const content = children
              .map((c: string) => c.replaceAll('\n', ''))
              .filter((c: string) => c !== '')
            if (content.length === 0) return

            return <Element>{content}</Element>
          }

          return <Element>{children}</Element>
        } catch (error) {
          console.error(`error while decoding contentfull article: ${id}`)
        }
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: any, children: any) => {
        const id = node.data.target.sys.id
        return <Asset id={id} />
      },
    },
  }

  if (loading)
    return (
      <Main>
        <P>Loading...</P>
      </Main>
    )

  if (error)
    return (
      <Main>
        <P>Error!</P>
      </Main>
    )

  if (data)
    return (
      <Main>
        <article className="flex flex-col gap-8 lg:px-2">
          <div
            className={`
          flex justify-center
          pt-8 pb-4
          `}
          >
            <H2>{data.article.title}</H2>
          </div>
          {data.article.artistPicture && (
            <div>
              <img
                className="max-w-xs"
                alt="artist profile"
                src={data.article.artistPicture.url}
              />
            </div>
          )}
          {documentToReactComponents(data.article.articleText.json, options)}
        </article>
      </Main>
    )
  return <></>
}
