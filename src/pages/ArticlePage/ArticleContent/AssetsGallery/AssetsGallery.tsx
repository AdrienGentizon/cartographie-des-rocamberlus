import React, { useState } from 'react'
import H3 from '../../../../components/H3/H3'
import { Article } from '../../../../types'
import PreviewScrollBar from './PreviewScrollBar/PreviewScrollBar'
import SlideShow from './SlideShow/SlideShow'

interface PropsType {
  article: Article & { articleText: { json: any } }
}

export default function AssetsGallery({ article }: PropsType) {
  const [open, setOpen] = useState(false)

  const assetIds = article.articleText.json.content
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
    )

  if (assetIds.length === 0) return <></>

  return (
    <>
      <H3
        style={{
          padding: '0 0 1rem 0',
        }}
      >
        Galerie
      </H3>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'min-content 1fr min-content',
          gridTemplateColumns: '650px',
          placeItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img alt="" src="/screen-top.png" />
        <div
          style={{
            padding: '0 1rem',
            maxWidth: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              maxWidth: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 8,
              borderImageOutset: 0,
              borderImageSource: 'url(/picture-frame.png)',
              borderImageSlice: 16,
              borderImageRepeat: 'round',
              borderImageWidth: 1.5,
              padding: '0 1rem',
              cursor: 'pointer',
            }}
            onClick={() => setOpen(true)}
          >
            <PreviewScrollBar assetIds={assetIds} />
            {open && (
              <SlideShow assetIds={assetIds} onClose={() => setOpen(false)} />
            )}
          </div>
        </div>
        <img
          alt=""
          src="/screen-bottom.png"
          style={{
            width: 'fit-content',
          }}
        />
      </div>
    </>
  )
}
