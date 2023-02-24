import React from 'react'
import Container from './Container/Container'
import Footer from './Footer/Footer'
import Header from './Header/Header'

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <Container>
      <Header />
      {children}
      <Footer />
    </Container>
  )
}
