import React from "react"

import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"

import useHomePage from "../../contentful/useHomePage"
import { H1, H2, Main, P } from "../../ui"

export default function HomePage() {
  const { loading, error, data } = useHomePage()

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
        <P className="text-justify">{children}</P>
      ),
    },
  }

  if (loading)
    return (
      <Main>
        <P>Loading...</P>
      </Main>
    )

  if (error)
    return (
      <Main>
        <P>Error!</P>;
      </Main>
    )
  if (data)
    return (
      <Main>
        <H1>{data.homePage.title}</H1>
        <section className="mb-8 px-4">
          <div className="py-4">
            <H2>{data.homePage.mainTextTitle}</H2>
          </div>

          {documentToReactComponents(data.homePage.mainText.json, options)}
        </section>
      </Main>
    )
  return <></>
}
