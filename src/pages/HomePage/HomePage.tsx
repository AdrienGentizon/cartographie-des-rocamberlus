import React from "react"

import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"

import useHomePage from "../../contentful/useHomePage"
import { H3, Main, P } from "../../ui"

export default function HomePage() {
  const { loading, error, data } = useHomePage()

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
        <P className="text-justify" withSeparator>
          {children}
        </P>
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
        <section className="pb-8 px-4">
          <div className="py-8">
            <H3>{data.homePage.mainTextTitle}</H3>
          </div>
          <div>
            {documentToReactComponents(data.homePage.mainText.json, options)}
          </div>
        </section>
      </Main>
    )
  return <></>
}
