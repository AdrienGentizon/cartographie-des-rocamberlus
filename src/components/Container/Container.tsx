import React from "react"

interface PropsType {
  children: React.ReactNode
}

export default function Container({ children }: PropsType) {
  return (
    <div className="bg-white min-h-screen flex flex-col lg:max-w-4xl mx-auto lg:border-l lg:border-r-2 border-yellow-400">
      {children}
    </div>
  )
}
