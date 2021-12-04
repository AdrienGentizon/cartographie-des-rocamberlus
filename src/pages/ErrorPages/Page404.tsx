import React from "react"
import { H2, Main, P } from "../../ui"

export default function Page404() {
  return (
    <Main>
      <H2>Page inexistante</H2>
      <P className="text-center">Cette adresse n'existe pas sur ce site.</P>
    </Main>
  )
}
