import React from 'react'

import useHomePage from '../../contentful/useHomePage'
import { H3, Main } from '../../ui'

function Separator() {
  return <div className="py-2 mx-auto border-b-2 w-2" />
}

export default function HomePage() {
  const { loading, error, homePage } = useHomePage()

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
      <Main>
        <div className="w-full h-96">
          <div className="flex justify-center items-center h-full">
            <span className="block loader" />
          </div>
        </div>
      </Main>
    )

  if (error || !homePage)
    return (
      <Main>
        <p>Error!</p>;
      </Main>
    )
  return (
    <Main>
      <section className="pb-8 px-4">
        <div className="py-8">
          <H3>{homePage.mainTextTitle}</H3>
        </div>

        <div>
          {' '}
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
    </Main>
  )
}
