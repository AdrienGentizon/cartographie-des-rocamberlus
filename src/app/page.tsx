import { Asset } from '@/components/Asset/Asset'
import H3 from '@/components/H3/H3'
import Header from '@/components/Header/Header'
import { Main } from '@/components/Main/Main'
import { ContentfulAsset } from '@/types'
import getHeaderContent from '@/utils/getHeaderContent'
import getHomePageContent from '@/utils/getHomePageContent'
import Image from 'next/image'
import React from 'react'

function Separator({
  asset,
  flip,
}: {
  asset: ContentfulAsset | undefined
  flip: boolean
}) {
  if (!asset) return <div className="mx-auto border-b border-gray-500 w-2" />
  return (
    <Image
      src={asset.url}
      alt="truelle"
      width={asset.width}
      height={asset.height}
      style={{
        width: '56px',
        margin: '0 auto',
        transform: flip ? `rotateY(180deg)` : undefined,
      }}
    />
  )
}

export default async function HomePage() {
  const header = await getHeaderContent()
  const { homePage, error, brouette, tertiary, truelle } =
    await getHomePageContent()

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

  if (error || !homePage) return <p>Error!</p>

  return (
    <>
      <Header
        title={homePage?.title === null ? undefined : homePage?.title}
        mainTitlePicture={homePage?.mainTitlePicture}
        artists={header.artists}
        assets={header.assets}
        asSearch
      />
      <Main>
        <section className="pb-8 px-4">
          <div className="pt-8 pb-0 lg:px-24">
            {tertiary ? (
              <>
                <h2 className="hide-me">{homePage.mainTextTitle}</h2>
                <Image
                  src={tertiary.url}
                  alt={homePage.mainTextTitle ?? 'site description'}
                  width={480}
                  height={40}
                />
              </>
            ) : (
              <H3>{homePage.mainTextTitle}</H3>
            )}
          </div>
          {brouette && (
            <Image
              className="max-h-40 mx-auto"
              alt="dessin de truelle"
              src={brouette.url}
              width={164}
              height={160}
            />
          )}
          <div>
            {homeContent.map(({ tag, value }, n) => {
              if (tag === 'p') {
                return (
                  <span key={`home-p-${n}`}>
                    <p className="text-sm lg:text-base lg:font-extralight font-light  py-4  text-justify">
                      {value}
                    </p>
                    {n < homeContent.length - 2 && (
                      <Separator asset={truelle} flip={(n & 1) === 0} />
                    )}
                  </span>
                )
              }

              return <></>
            })}
          </div>
        </section>
      </Main>
    </>
  )
}
