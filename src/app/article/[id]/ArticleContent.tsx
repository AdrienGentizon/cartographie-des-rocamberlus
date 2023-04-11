import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import React from 'react'
import { ContentfulAsset, ValidArticle } from '../../../types'
import AssetsGallery from './AssetsGallery'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import YoutubeVideoEmbedder from '../../../components/YoutubeVideoEmbedder/YoutubeVideoEmbedder'
import { Asset } from '../../../components/Asset/Asset'
import BottomNotes from './BottomNotes'

function isHyperlinkNode(node: any): node is { data: { uri: string } } {
  return (node as { data: { uri: string } }).data?.uri !== undefined
}

interface PropsType {
  article: ValidArticle
  artistPicture?: ContentfulAsset
  assets: ContentfulAsset[]
  icons: {
    references: ContentfulAsset | undefined
    webography: ContentfulAsset | undefined
    media: ContentfulAsset | undefined
    gallery: ContentfulAsset | undefined
  }
}

export default function ArticleContent({
  article,
  artistPicture,
  assets,
  icons,
}: PropsType) {
  const locationName = article?.locationName ? article?.locationName : undefined

  const renderOptions = {
    renderNode: {
      [MARKS.BOLD]: (node: any, children: any) => <strong>{children}</strong>,
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
        return (
          <p className="text-sm lg:text-base lg:font-extralight font-light  pb-3  text-justify">
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
      [INLINES.HYPERLINK]: (node: any, children: any) => {
        if (!isHyperlinkNode(node)) return <></>
        if (node.data.uri.includes('youtu.be')) {
          return (
            <div className="flex justify-center w-full py-2">
              <YoutubeVideoEmbedder url={node.data.uri} />
            </div>
          )
        }
        return (
          <a
            className="underline cursor-pointer"
            target="_blank"
            href={node.data.uri}
            rel="noreferrer"
          >
            {children}
          </a>
        )
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: any, children: any) => {
        if (!node.data.target.sys.id) return <></>
        const asset = assets.find(
          ({ sys: { id } }) => id === node.data.target.sys.id
        )
        if (!asset) return <></>
        return (
          <div
            className={`article-content-asset ${
              asset.width > asset.height ? 'paysage' : 'portrait'
            }`}
            style={{
              paddingBottom: '1rem',
            }}
          >
            <Asset asset={asset} />
          </div>
        )
      },
    },
  }
  if (!article) return <></>

  return (
    <article
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '0 0.5rem 4rem 0.5rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '1.5rem 0',
          justifyContent: 'center',
        }}
      >
        <h2
          style={{
            fontSize: '1.5rem',
            lineHeight: '2rem',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          {article.title}
        </h2>
        {locationName && (
          <p
            style={{
              fontWeight: 100,
              fontSize: '0.875rem',
              lineHeight: '1.25rem',
            }}
          >
            {locationName}
          </p>
        )}
      </div>
      <div>
        {artistPicture && (
          <div
            className="lg:float-left lg:mr-8"
            style={{
              marginBottom: '1rem',
            }}
          >
            <Asset
              asset={artistPicture}
              imageStyle={{
                objectFit: 'cover',
                maxWidth: '256px',
              }}
            />
          </div>
        )}
        {documentToReactComponents(article.articleText.json, renderOptions)}
        <BottomNotes article={article} icons={icons} />
        {<AssetsGallery assets={assets} icons={icons} />}
      </div>
    </article>
  )
}
