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
      <H3>Galerie</H3>
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
