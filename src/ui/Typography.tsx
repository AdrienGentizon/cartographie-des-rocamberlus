import React, { ReactNode } from "react"

interface PropsType {
  children: ReactNode
  className?: string
}
export function H1({ children }: PropsType) {
  return <h1 className="text-3xl mt-4 py-8 uppercase font-thin">{children}</h1>
}

export function H2({ children }: PropsType) {
  return <h2 className="text-xl p-6 font-thin italic">{children}</h2>
}

export function P({ children, className }: PropsType) {
  return (
    <p
      className={`text-sm py-2 font-light lg:font-light leading-loose ${className}`}
    >
      {children}
    </p>
  )
}
