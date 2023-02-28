import { useState, useEffect } from 'react'
import useImageFromId from '../../../../contentful/useAssetFromId'

const MILL_ID = '3agj2s4Uqz2gIjkxAoVIGy'
const WELL_ID = '7wxSIV2ollwz7lEAxlbpt4'
const STATUE_ID = '4ImM2j4tL1z5Yg7yuiz7SR'
const DEER_ID = '2WlIf3SOvzVVg9NraIuDfd'
const ELEFANT_ID = '63SBdGZHOxTTFg4bheOY24'
const SKULL_ID = '1gOCGnkUJB0OJtP3rHBeOQ'
const PARTICLE_DENSITY = 8

interface PropsType {
  containerHeight: number
}
export default function BackGroundRandom({ containerHeight }: PropsType) {
  const {
    image: mill,
    loading: loadingMill,
    error: errorMill,
  } = useImageFromId(MILL_ID)
  const {
    image: well,
    loading: loadingWell,
    error: errorWell,
  } = useImageFromId(WELL_ID)
  const {
    image: statue,
    loading: loadingStatue,
    error: errorStatue,
  } = useImageFromId(STATUE_ID)
  const {
    image: deer,
    loading: loadingDeer,
    error: errorDeer,
  } = useImageFromId(DEER_ID)
  const {
    image: elefant,
    loading: loadingElefant,
    error: errorElefant,
  } = useImageFromId(ELEFANT_ID)
  const {
    image: skull,
    loading: loadingSkull,
    error: errorSkull,
  } = useImageFromId(SKULL_ID)

  const [particles, setParticles] = useState<
    { top: number; left?: number; right?: number }[]
  >([])
  const loading =
    loadingMill ||
    loadingWell ||
    loadingStatue ||
    loadingDeer ||
    loadingElefant ||
    loadingSkull
  const error =
    errorMill ||
    errorWell ||
    errorStatue ||
    errorDeer ||
    errorElefant ||
    errorSkull
  const getRandomSource = () => {
    const alea = Math.random()
    if (alea < 0.2) return statue?.url ?? ''
    if (alea < 0.4) return deer?.url ?? ''
    if (alea < 0.6) return elefant?.url ?? ''
    if (alea < 0.8) return skull?.url ?? ''
    if (alea < 0.9) return mill?.url ?? ''
    return well?.url ?? ''
  }

  useEffect(() => {
    const particles: { top: number; left?: number; right?: number }[] = []
    if (containerHeight > 0) {
      const ratio = Math.floor(containerHeight / window.innerHeight)
      for (let n = 0; n < PARTICLE_DENSITY * ratio; n++) {
        particles.push({
          top: 100 * Math.random(),
          left: Boolean(n % 2) ? undefined : 256 * Math.random() - 48,
          right: Boolean(n % 2) ? 256 * Math.random() - 48 : undefined,
        })
      }
      setParticles(particles)
    }
  }, [containerHeight, well, mill, statue, deer])
  if (loading || error) return <></>
  return (
    <div className="w-screen absolute grid grid-cols-2 gap-x-80">
      {particles.map(({ top, left, right }, n: number) => {
        return (
          <div
            key={`particle-${n}`}
            style={{
              height: 300,
              width: '100%',
            }}
            className="hidden lg:block relative"
          >
            <img
              style={{
                top,
                left,
                right,
              }}
              className="absolute"
              alt="particle"
              src={getRandomSource()}
            />
          </div>
        )
      })}
    </div>
  )
}
