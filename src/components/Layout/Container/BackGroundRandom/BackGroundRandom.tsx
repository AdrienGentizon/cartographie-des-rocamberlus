import { useState, useEffect } from 'react'
import useImageFromId from '../../../../contentful/useAssetFromId'

const MILL_ID = '3agj2s4Uqz2gIjkxAoVIGy'
const WELL_ID = '7wxSIV2ollwz7lEAxlbpt4'
const STATUE_ID = '4ImM2j4tL1z5Yg7yuiz7SR'
const DEER_ID = '2WlIf3SOvzVVg9NraIuDfd'
const ELEFANT_ID = '63SBdGZHOxTTFg4bheOY24'
const SKULL_ID = '1gOCGnkUJB0OJtP3rHBeOQ'
const TRUELLE_ID = '65APH11IpPHVkyQD1WsuXc'
const GRID_ROW_HEIGHT = 280

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
  const {
    image: truelle,
    loading: loadingTruelle,
    error: errorTruelle,
  } = useImageFromId(TRUELLE_ID)

  const [particles, setParticles] = useState<
    { top: number; left?: number; right?: number }[]
  >([])
  const loading =
    loadingMill ||
    loadingWell ||
    loadingStatue ||
    loadingDeer ||
    loadingElefant ||
    loadingSkull ||
    loadingTruelle
  const error =
    errorMill ||
    errorWell ||
    errorStatue ||
    errorDeer ||
    errorElefant ||
    errorSkull ||
    errorTruelle
  const getRandomSource = () => {
    const alea = Math.random()
    if (alea < 0.4) return truelle?.url ?? ''
    if (alea < 0.5) return statue?.url ?? ''
    if (alea < 0.6) return deer?.url ?? ''
    if (alea < 0.7) return elefant?.url ?? ''
    if (alea < 0.8) return well?.url ?? ''
    if (alea < 0.9) return mill?.url ?? ''
    return skull?.url ?? ''
  }

  useEffect(() => {
    const particles: { top: number; left?: number; right?: number }[] = []
    if (containerHeight > 0) {
      for (
        let n = 0;
        n < containerHeight - (GRID_ROW_HEIGHT - 96);
        n += GRID_ROW_HEIGHT
      ) {
        particles.push({
          top: 150 * Math.random(),
          left: 256 * Math.random() - 48,
          right: undefined,
        })
        particles.push({
          top: 150 * Math.random(),
          left: undefined,
          right: 256 * Math.random() - 48,
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
              height: GRID_ROW_HEIGHT,
              width: '100%',
            }}
            className="hidden lg:block relative"
          >
            <img
              style={{
                top,
                left,
                right,
                rotate: `${
                  (Math.random() > 0.5 ? 1 : -1) * 4 * Math.random()
                }deg`,
                transform: Math.random() > 0.5 ? `rotateY(180deg)` : undefined,
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
