import React from 'react'
import useHomePage from '../../../contentful/useHomePage'
import { H1 } from '../../../ui'

export default function Title() {
  const { homePage } = useHomePage()

  if (!homePage) return <></>

  return (
    <div className="text-center pt-4 pb-2">
      <H1>{homePage.title}</H1>
    </div>
  )
}
