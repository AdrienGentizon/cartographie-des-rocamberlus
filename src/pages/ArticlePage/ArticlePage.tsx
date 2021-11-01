import React from "react";
import { useParams } from "react-router-dom";
import useArticleFromId from "../../contentful/useArticleFromId";
import { H1, P } from "../../ui";
import Main from "../../ui/Main";

export default function ArticlePage() {
  const { id } = useParams<{ id?: string }>();

  const { loading, error, data } = useArticleFromId(id);
  if (loading) return <P>Loading...</P>;
  if (error) return <P>Error!</P>;
  if (data)
    return (
      <Main>
        <H1>{data.article.title}</H1>
      </Main>
    );
  return <></>;
}
