import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import React from 'react'
import { ValidArticle } from '../../../types'
import AssetsGallery from './AssetsGallery/AssetsGallery'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import YoutubeVideoEmbedder from '../../../components/YoutubeVideoEmbedder/YoutubeVideoEmbedder'
import { Asset, Img } from '../../../components/Asset/Asset'
import BottomNotes from './BottomNotes/BottomNotes'

function isHyperlinkNode(node: any): node is { data: { uri: string } } {
  return (node as { data: { uri: string } }).data?.uri !== undefined
}

interface PropsType {
  article: ValidArticle
}

export default function ArticleContent({ article }: PropsType) {
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
        return (
          <div
            style={{
              paddingBottom: '1rem',
            }}
          >
            <Asset id={node.data.target.sys.id} />
          </div>
        )
      },
    },
  }

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
        {article.artistPicture && (
          <div
            className="lg:max-w-xs lg:float-left lg:mr-8"
            style={{
              marginBottom: '1rem',
            }}
          >
            <Img
              alt="artist profile"
              src={`${article.artistPicture.url}?w=400`}
            />
            {(article.artistPicture?.description ||
              article.artistPicture?.title) && (
              <p
                style={{
                  fontWeight: 100,
                  fontSize: '0.75rem',
                  lineHeight: '1rem',
                }}
              >
                {article.artistPicture?.description
                  ? article.artistPicture.description
                  : article.artistPicture?.title
                  ? article.artistPicture.title
                  : ''}
              </p>
            )}
          </div>
        )}
        {documentToReactComponents(article.articleText.json, renderOptions)}
        <BottomNotes article={article} />
        {<AssetsGallery article={article} />}
      </div>
    </article>
  )
}
