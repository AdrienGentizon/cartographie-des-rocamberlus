import { useState, useEffect } from 'react'
import useImageFromId from '../../../contentful/useAssetFromId'

const FLOWER_ID = '4AS9TKfECMPrNfmBPpplES'
const GRASS_ID = '5nX6KH1GrITrptF6pIMUz5'
const PARTICLE_DENSITY = 16

interface PropsType {
  containerHeight: number
}
export default function BackGroundRandom({ containerHeight }: PropsType) {
  const { image: flower } = useImageFromId(FLOWER_ID)
  const { image: grass } = useImageFromId(GRASS_ID)

  const [particles, setParticles] = useState<{ top: number; left: number }[]>(
    []
  )

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
  }, [containerHeight, flower, grass])
  return (
    <div className="w-screen absolute">
      {flower &&
        grass &&
        particles.map(({ top, left }, n: number) => {
          return (
            <img
              key={`flower-${n}`}
              className="hidden lg:block absolute w-8"
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
  )
}
