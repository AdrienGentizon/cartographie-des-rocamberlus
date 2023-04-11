import { BackGroundRandom } from './BackGroundRandom/BackGroundRandom'
import { ContentfulAsset } from '@/types'

interface PropsType {
  assets: ContentfulAsset[]
}

export default function Container({
  assets,
  children,
}: React.PropsWithChildren<PropsType>) {
  return (
    <BackGroundRandom assets={assets}>
      <div
        className="container"
        style={{
          backgroundColor: 'rgb(255 255 255 / 1)',
          minHeight: '100vh',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          margin: '0 auto',
          boxShadow:
            'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.1) 0px 8px 10px -6px',
        }}
      >
        {children}
      </div>
    </BackGroundRandom>
  )
}
