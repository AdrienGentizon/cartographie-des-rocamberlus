import { RichTextContent } from 'contentful'
import React from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import useArticleFromId from '../../contentful/useArticleFromId'
import { H2, Main, Asset, Img } from '../../ui'

function ArticlePage() {
  const { id } = useParams<{ id?: string }>()

  const { loading, error, article } = useArticleFromId(id ?? '')

  let firstParagraph = true

  const getArticleContent = (
    items: RichTextContent[],
    values: {
      tag: 'img' | 'p'
      value: string
    }[] = []
  ) => {
    for (const item of items) {
      if (item.nodeType === 'embedded-asset-block' && item.data.target)
        values.push({ tag: 'img', value: item.data.target.sys.id })
      if (item.nodeType === 'text' && item.value) {
        if (item.value === '') continue
        values.push({
          tag: 'p',
          value: item.value.replaceAll('\n', ''),
        })
      }
      if (item.content) {
        getArticleContent(item.content, values)
      }
    }
    return values
  }
  const articleContent = getArticleContent(
    article?.articleText?.json.content ?? []
  )

  if (loading)
    return (
      <Main>
        <p>Loading...</p>
      </Main>
    )

  if (error || !article)
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

        {/* {documentToReactComponents(data.article.articleText.json, options)} */}
        {articleContent.map(({ tag, value }, n) => {
          if (tag === 'p') {
            if (firstParagraph) {
              firstParagraph = false
              return (
                <div key={`p-${n}`}>
                  {article.artistPicture && (
                    <Img
                      className="lg:max-w-xs lg:float-left lg:mr-8 "
                      alt="artist profile"
                      src={`${article.artistPicture.url}?w=400`}
                    />
                  )}
                  <p className="text-sm lg:text-base lg:font-extralight font-light  pb-4  text-justify">
                    {value}
                  </p>
                </div>
              )
            }
            return (
              <p
                className="text-sm lg:text-base lg:font-extralight font-light  py-4  text-justify"
                key={`p-${n}`}
              >
                {value}
              </p>
            )
          }
          return <Asset key={`p-${n}`} id={value} />
        })}
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
