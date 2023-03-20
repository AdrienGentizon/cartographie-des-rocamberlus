import React, { useState } from 'react'
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

  return (
    <>
      <h3
        style={{
          fontSize: '1.25rem',
          lineHeight: '1.75rem',
          padding: '0.5rem 0 1rem 0',
        }}
      >
        Galerie
      </h3>
      <div
        style={{
          display: 'flex',
          width: 'fit-content',
          maxWidth: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 8,
          borderImageOutset: 0,
          borderImageSource: 'url(/picture-frame.png)',
          borderImageSlice: 16,
          borderImageRepeat: 'round',
          borderImageWidth: 1.5,
          margin: '0 auto',
          cursor: 'pointer',
        }}
        onClick={() => setOpen(true)}
      >
        <PreviewScrollBar assetIds={assetIds} />
        {open && (
          <SlideShow assetIds={assetIds} onClose={() => setOpen(false)} />
        )}
      </div>
    </>
  )
}
