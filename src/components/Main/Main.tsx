import React, { ReactNode } from "react"

interface PropsType {
  children?: ReactNode
  fullWidth?: boolean
}

export function Main({ children, fullWidth }: PropsType) {
  return (
    <main
      className={`flex flex-col text-center mx-auto mb-auto w-full min-h-full ${
        fullWidth ? "" : "px-4 lg:px-8"
      }`}
    >
      {children}
    </main>
  )
}
