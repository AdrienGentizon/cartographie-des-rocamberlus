import React from 'react'

interface PropsType {
  children: React.ReactNode
}

export default function Body({ children }: PropsType) {
  return <div className="bg-white">{children}</div>
}
