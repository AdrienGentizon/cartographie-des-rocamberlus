import React from "react"

interface PropsType {
  children: React.ReactNode
}

export default function Container({ children }: PropsType) {
  return (
    <div className="bg-white min-h-screen flex flex-col lg:max-w-2xl mx-auto lg:border-l lg:border-r border-gray-500">
      {children}
    </div>
  )
}
