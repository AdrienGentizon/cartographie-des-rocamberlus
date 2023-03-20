import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import isDesktop from '../../../utils/isDesktop'
import { BackGroundRandom } from './BackGroundRandom/BackGroundRandom'

export default function Container({
  imageUrls,
  children,
}: React.PropsWithChildren<{ imageUrls: string[] }>) {
  const history = useHistory()
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null)
  const [containerHeight, setContainerHeight] = useState(0)
  const resizeObs = useRef(
    new ResizeObserver((entries) => {
      if (entries.length > 0) {
        setContainerHeight(entries[0].target.getBoundingClientRect().height)
      }
    })
  )

  useEffect(() => {
    const observer = resizeObs.current
    if (containerRef) observer.observe(containerRef)
    return () => {
      if (containerRef) observer.unobserve(containerRef)
    }
  }, [containerRef, resizeObs, history.location.pathname])

  return (
    <>
      <BackGroundRandom
        containerHeight={containerHeight}
        imageUrls={imageUrls}
      />
      <div
        ref={setContainerRef}
        style={{
          backgroundColor: 'rgb(255 255 255 / 1)',
          minHeight: '100vh',
          height: '100%',
          maxWidth: isDesktop() ? '48rem' : undefined,
          display: 'flex',
          flexDirection: 'column',
          margin: '0 auto',
          boxShadow:
            'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.1) 0px 8px 10px -6px',
        }}
      >
        {children}
      </div>
    </>
  )
}
