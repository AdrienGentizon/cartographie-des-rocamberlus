import React, { HTMLAttributes } from 'react'
import { useHistory } from 'react-router-dom'

export function Main({
  children,
  ...props
}: React.PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  const history = useHistory()

  return (
    <main
      className={`${
        history.location.pathname.startsWith('/map') ? 'main-with-map' : ''
      } flex flex-col text-center mx-auto mb-auto w-full min-h-full px-0 lg:px-8`}
      {...props}
    >
      {children}
    </main>
  )
}
