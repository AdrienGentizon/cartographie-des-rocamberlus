import React from "react";

import Link from "../../../components/Link/Link";
import { ContentfulLocation } from "../../../types";
import Map from "./Map";

interface PropsType {
  locations: ContentfulLocation[];
  articles: { articleId: string; articleTitle: string }[];
  error?: Error;
}

export default function MapPage({
  locations,
  articles: articlesIds,
  error,
}: PropsType) {
  if (error) return <p>Error!</p>;

  if (locations.length > 0)
    return (
      <>
        <Map locations={locations} />
        {articlesIds.length > 0 && (
          <ul className="hide-me">
            {articlesIds.map(({ articleId, articleTitle }) => (
              <li key={`article-link-${articleId}`}>
                <Link href={`/article/${articleId}`}>{articleTitle}</Link>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  return <></>;
}
