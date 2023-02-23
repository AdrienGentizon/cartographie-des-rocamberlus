import React from 'react'
import Nav from '../Nav/Nav'
import Title from './Title/Title'

export default function Header() {
  const darkMode = false

  return (
    <header
      className={`
      flex flex-col justify-center
      px-12
      z-10
      ${darkMode ? 'text-white mix-blend-difference' : ''}
      `}
    >
      <Title />
      <Nav />
    </header>
  )
}
