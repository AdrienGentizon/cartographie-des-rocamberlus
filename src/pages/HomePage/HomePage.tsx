import React from "react";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

import useHomePage from "../../contentful/useHomePage";
import { H1, H2, P } from "../../ui";
import Main from "../../ui/Main";

export default function HomePage() {
  const { loading, error, data } = useHomePage();

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
        <P align="justify">{children}</P>
      ),
    },
  };

  if (loading) return <h1>loading</h1>;
  if (error) return <h1>error</h1>;
  if (data)
    return (
      <Main>
        <H1>{data.homePage.title}</H1>
        <H2>{data.homePage.mainTextTitle}</H2>
        {documentToReactComponents(data.homePage.mainText.json, options)}
      </Main>
    );
  return <></>;
}
