import React from 'react'
import { useLocation } from 'react-router-dom'
import Nav from '../Nav/Nav'
import Title from './Title/Title'

export default function Header() {
  const { pathname } = useLocation()
  const darkMode = pathname === '/map'

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
