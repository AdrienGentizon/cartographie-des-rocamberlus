import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import BackGroundRandom from './BackGroundRandom/BackGroundRandom'

interface PropsType {
  children: React.ReactNode
}

export default function Container({ children }: PropsType) {
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
    if (containerRef) resizeObs.current.observe(containerRef)
  }, [containerRef, resizeObs, history.location.pathname])

  return (
    <>
      <BackGroundRandom containerHeight={containerHeight} />
      <div
        ref={setContainerRef}
        className="relative bg-white min-h-screen h-full flex flex-col lg:max-w-3xl mx-auto shadow"
      >
        {children}
      </div>
    </>
  )
}
