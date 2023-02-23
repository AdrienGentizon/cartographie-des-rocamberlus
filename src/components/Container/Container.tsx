import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import useImageFromId from '../../contentful/useAssetFromId'

interface PropsType {
  children: React.ReactNode
}
const FLOWER_ID = '4AS9TKfECMPrNfmBPpplES'
const GRASS_ID = '5nX6KH1GrITrptF6pIMUz5'
const PARTICLE_DENSITY = 16
export default function Container({ children }: PropsType) {
  const history = useHistory()
  const { image: flower } = useImageFromId(FLOWER_ID)
  const { image: grass } = useImageFromId(GRASS_ID)
  const [particles, setParticles] = useState<{ top: number; left: number }[]>(
    []
  )
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
  }, [containerRef, resizeObs])
  useEffect(() => {
    const particles: { top: number; left: number }[] = []
    if (containerHeight > 0) {
      const ratio = Math.floor(containerHeight / window.innerHeight)
      for (let n = 0; n < PARTICLE_DENSITY * ratio; n++) {
        particles.push({
          top: ratio * window.innerHeight * Math.random(),
          left: window.innerWidth * Math.random(),
        })
      }
      setParticles(particles)
    }
  }, [containerHeight, flower, grass, history.location.pathname])
  return (
    <>
      <div className="w-screen absolute">
        {flower &&
          grass &&
          particles.map(({ top, left }, n: number) => {
            return (
              <img
                key={`flower-${n}`}
                className="absolute w-8"
                style={{
                  top,
                  left,
                }}
                alt="flower"
                src={Math.random() > 0.75 ? flower.url : grass.url}
              />
            )
          })}
      </div>
      <div
        ref={setContainerRef}
        className="relative bg-white min-h-screen h-full flex flex-col lg:max-w-3xl mx-auto shadow"
      >
        {children}
      </div>
    </>
  )
}
