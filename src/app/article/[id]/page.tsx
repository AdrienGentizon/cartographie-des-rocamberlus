import ArticlePage from '@/app/article/[id]/ArticlePage'
import getArticleFromId from '@/queries/getArticleFromId'
import getAssetFromId from '@/queries/getAssetFromId'
import { ValidArticle } from '@/types'
import { TITLES } from '@/utils/assetsIds'
import React from 'react'

import { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.cartographie-des-rocamberlus.com/article/1tSKGhWoQldll52ToIw4uh`,
  },
}
async function getArticleContent(params: { id: string }) {
  const { article, error, draft } = await getArticleFromId(params.id ?? '')
  if (article?.artistPicture?.sys?.id) {
    const { image: artistPicture } = await getAssetFromId(
      article.artistPicture.sys.id,
      {
        size: 256,
      }
    )
    return { article, error, draft, artistPicture }
  }
  return { article, error, draft, artistPicture: undefined }
}

async function getIcons() {
  const { image: references } = await getAssetFromId(TITLES.references)
  const { image: webography } = await getAssetFromId(TITLES.webography)
  const { image: media } = await getAssetFromId(TITLES.media)
  const { image: gallery } = await getAssetFromId(TITLES.gallery)

  return {
    references,
    webography,
    media,
    gallery,
  }
}

async function getArticleAssets(article: ValidArticle | undefined) {
  if (!article) return []
  const ids = article.articleText.json.content
    .filter(
      ({
        nodeType,
        data,
      }: unknown & { nodeType: string; data?: unknown | null }) =>
        nodeType === 'embedded-asset-block' && data
    )
    .map(
      ({
        data: {
          target: {
            sys: { id },
          },
        },
      }: unknown & { data: { target: { sys: { id: string } } } }) => id
    ) as string[]
  const assets = []

  for (const id of ids) {
    const { image } = await getAssetFromId(id, {
      size: 720,
    })
    if (image) assets.push(image)
  }
  return assets
}

export default async function Article({ params }: { params: { id: string } }) {
  const { article, error, draft, artistPicture } = await getArticleContent(
    params
  )
  const icons = await getIcons()
  const assets = await getArticleAssets(article)
  return (
    <ArticlePage
      article={article}
      artistPicture={artistPicture}
      assets={assets}
      icons={icons}
      draft={draft ?? false}
      error={error}
    />
  )
}
