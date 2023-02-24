import React from 'react'
import Layout from '../../components/Layout/Layout'
import { H3, Main } from '../../ui'

function Page404() {
  return (
    <Main>
      <div className="h-96 flex flex-col gap-2 items-center  justify-center">
        <H3>Page inexistante</H3>
        <p className="text-center">Cette adresse n'existe pas sur ce site.</p>
      </div>
    </Main>
  )
}

export default function Wrapper() {
  return (
    <Layout>
      <Page404 />
    </Layout>
  )
}
