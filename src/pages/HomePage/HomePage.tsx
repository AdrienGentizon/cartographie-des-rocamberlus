import React from 'react'
import Layout from '../../components/Layout/Layout'
import useImageFromId from '../../graphql/useAssetFromId'
import useHomePage from '../../graphql/useHomePage'

import { H3 } from '../../ui'
import { ASSETS } from '../../utils/getAssetFromName'

function Separator() {
  return <div className="mx-auto border-b border-gray-500 w-2" />
}

function HomePage() {
  const { loading, error, homePage } = useHomePage()
  const { image: truelle } = useImageFromId(ASSETS.truelle)

  const getArticleContent = (
    items: any[],
    values: {
      tag: 'img' | 'p'
      value: string
    }[] = []
  ) => {
    for (const item of items) {
      if (item.nodeType === 'embedded-asset-block')
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
  const homeContent = getArticleContent(homePage?.mainText?.json.content ?? [])

  if (loading)
    return (
      <div className="w-full h-96">
        <div className="flex justify-center items-center h-full">
          <span className="block loader" />
        </div>
      </div>
    )

  if (error || !homePage) return <p>Error!</p>

  return (
    <section className="pb-8 px-4">
      <div className="py-8">
        <H3>{homePage.mainTextTitle}</H3>
      </div>
      {truelle && (
        <img
          className="max-h-40 mx-auto"
          alt="dessin de truelle"
          src={truelle.url}
        />
      )}
      <div>
        {homeContent.map(({ tag, value }, n) => {
          if (tag === 'p') {
            return (
              <React.Fragment key={`home-p-${n}`}>
                <p className="text-sm lg:text-base lg:font-extralight font-light  py-4  text-justify">
                  {value}
                </p>
                {n < homeContent.length - 1 && <Separator />}
              </React.Fragment>
            )
          }

          return <></>
        })}
      </div>
    </section>
  )
}

export default function Wrapper() {
  return (
    <Layout>
      <HomePage />
    </Layout>
  )
}
