import React from 'react'
import ArticleError from './ArticleError'
import ArticleDraft from './ArticleDraft'
import ArticleContent from './ArticleContent'
import { ContentfulAsset, ValidArticle } from '@/types'

interface PropsType {
  article: ValidArticle | undefined
  assets: ContentfulAsset[]
  artistPicture?: ContentfulAsset
  icons: {
    references: ContentfulAsset | undefined
    webography: ContentfulAsset | undefined
    media: ContentfulAsset | undefined
    gallery: ContentfulAsset | undefined
  }
  draft: boolean
  error?: Error
}

export default function ArticlePage({
  article,
  artistPicture,
  assets,
  draft,
  error,
  icons,
}: PropsType) {
  if (error || article === undefined) return <ArticleError />

  if (draft) return <ArticleDraft />

  return (
    <ArticleContent
      article={article}
      artistPicture={artistPicture}
      assets={assets}
      icons={icons}
    />
  )
}
