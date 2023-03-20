import React from 'react'
import H3 from '../../components/H3/H3'
import Layout from '../../components/Layout/Layout'

function Page404() {
  return (
    <div className="h-96 flex flex-col gap-2 items-center  justify-center">
      <H3>Page inexistante</H3>
      <p className="text-center">Cette adresse n'existe pas sur ce site.</p>
    </div>
  )
}

export default function Wrapper() {
  return (
    <Layout>
      <Page404 />
    </Layout>
  )
}
