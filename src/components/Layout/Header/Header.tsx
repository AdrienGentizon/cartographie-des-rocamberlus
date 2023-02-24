import React from 'react'
import Nav from '../../Nav/Nav'
import Title from './Title/Title'

export default function Header() {
  return (
    <header className="flex flex-col justify-center px-12 relative">
      <Title />
      <Nav />
    </header>
  )
}
