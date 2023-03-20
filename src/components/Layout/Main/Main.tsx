import React, { HTMLAttributes } from 'react'
import { useHistory } from 'react-router-dom'
import isDesktop from '../../../utils/isDesktop'

export function Main({
  children,
  ...props
}: React.PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  const history = useHistory()

  return (
    <main
      className={
        history.location.pathname.startsWith('/map') ? 'main-with-map' : ''
      }
      style={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        margin: '0 auto auto auto',
        width: '100%',
        minHeight: '100%',
        padding: isDesktop() ? '0 2rem' : 0,
      }}
      {...props}
    >
      {children}
    </main>
  )
}
