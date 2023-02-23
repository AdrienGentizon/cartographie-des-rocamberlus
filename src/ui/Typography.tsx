import React, { ReactNode } from 'react'

interface PropsType {
  children: ReactNode
  withSeparator?: boolean
  className?: string
}
export function H1({ children }: PropsType) {
  return (
    <h1
      className={`
  text-3xl
  uppercase font-thin
  lg:text-4xl
  `}
    >
      {children}
    </h1>
  )
}

export function H2({ children }: PropsType) {
  return <h2 className="text-2xl uppercase font-bold">{children}</h2>
}

export function H3({ children }: PropsType) {
  return <h3 className="text-xl font-thin italic">{children}</h3>
}
