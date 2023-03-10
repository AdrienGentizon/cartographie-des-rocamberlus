import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
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
        className="bg-white min-h-screen h-full flex flex-col lg:max-w-3xl mx-auto shadow-xl"
      >
        {children}
      </div>
    </>
  )
}
