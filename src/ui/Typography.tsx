import React, { ReactNode } from "react"

interface PropsType {
  children: ReactNode
  withSeparator?: boolean
  className?: string
}
export function H1({ children }: PropsType) {
  return <h1 className="text-4xl mt-4 py-8 uppercase font-thin">{children}</h1>
}

export function H2({ children }: PropsType) {
  return <h2 className="text-xl p-6 font-thin italic">{children}</h2>
}

export function P({ children, withSeparator, className }: PropsType) {
  return (
    <>
      <p
        className={`text-sm lg:text-base lg:leading-loose lg:font-extralight py-2 font-light leading-loose ${className}`}
      >
        {children}
      </p>
      {withSeparator && <div className="py-2 mx-auto" />}
    </>
  )
}
