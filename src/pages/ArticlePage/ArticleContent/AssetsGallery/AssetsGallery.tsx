import React, { useState } from 'react'
import CustomBorderDiv from '../../../../components/CustomBorderDiv/CustomBorderDiv'
import H3 from '../../../../components/H3/H3'
import { Article } from '../../../../types'
import isDesktop from '../../../../utils/isDesktop'
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

  if (!isDesktop()) return <></>
  if (assetIds.length === 0) return <></>

  return (
    <>
      <h4
        style={{
          padding: '2rem 0 1rem 0',
          fontSize: '1.25rem',
          textTransform: 'none',
          fontWeight: 200,
        }}
      >
        Galerie
      </h4>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'min-content 1fr min-content',
          gridTemplateColumns: '700px',
          placeItems: 'center',
          justifyContent: 'center',
          paddingBottom: '2rem',
        }}
      >
        <div
          style={{
            padding: '0 1rem',
            maxWidth: '100%',
          }}
        >
          <CustomBorderDiv
            style={{
              display: 'flex',
              maxWidth: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 1rem',
              cursor: 'pointer',
            }}
            onClick={() => setOpen(true)}
          >
            <PreviewScrollBar assetIds={assetIds} />
            {open && (
              <SlideShow assetIds={assetIds} onClose={() => setOpen(false)} />
            )}
          </CustomBorderDiv>
        </div>
      </div>
    </>
  )
}
