import React, { HTMLAttributes } from 'react'

export function Main({
  children,
  ...props
}: React.PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return (
    <main
      className="flex flex-col text-center mx-auto mb-auto w-full min-h-full px-4 lg:px-8"
      {...props}
    >
      {children}
    </main>
  )
}
