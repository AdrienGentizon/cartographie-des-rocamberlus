import React from "react";
import { useParams } from "react-router-dom";
import useArticleFromId from "../../contentful/useArticleFromId";
import { H1, P } from "../../ui";
import Main from "../../ui/Main";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

export default function ArticlePage() {
  const { id } = useParams<{ id?: string }>();

  const { loading, error, data } = useArticleFromId(id);

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
        <P align="justify">{children}</P>
      ),
    },
  };

  if (loading)
    return (
      <Main>
        <P>Loading...</P>;
      </Main>
    );

  if (error)
    return (
      <Main>
        <P>Error!</P>;
      </Main>
    );

  if (data)
    return (
      <Main>
        <H1>{data.article.title}</H1>
        {documentToReactComponents(data.article.articleText.json, options)}
      </Main>
    );
  return <></>;
}
