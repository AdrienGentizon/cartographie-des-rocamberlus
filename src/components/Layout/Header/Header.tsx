import React from 'react'
import isDesktop from '../../../utils/isDesktop'
import Nav from './Nav/Nav'
import SubTitle from './SubTitle/SubTitle'
import Title from './Title/Title'

export default function Header() {
  const padding: React.CSSProperties = isDesktop()
    ? {
        padding: '0.5rem 2.5rem 0 2.5rem',
      }
    : {
        padding: '0 0.5rem',
      }
  return (
    <header
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        ...padding,
      }}
    >
      <Title />
      <SubTitle />
      <Nav />
    </header>
  )
}
