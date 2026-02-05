"use client";

import { useEffect } from "react";

import { useStorageContext } from "@/components/contexts/StorageContext";
import { ContentfulAsset, ValidArticle } from "@/utils/types";

import ArticleContent from "./ArticleContent";
import ArticleDraft from "./ArticleDraft";
import ArticleError from "./ArticleError";

interface PropsType {
  article: ValidArticle | undefined;
  assets: ContentfulAsset[];
  artistPicture?: ContentfulAsset;
  icons: {
    references: ContentfulAsset | undefined;
    webography: ContentfulAsset | undefined;
    media: ContentfulAsset | undefined;
    gallery: ContentfulAsset | undefined;
  };
  draft: boolean;
  error?: Error;
}

export default function ArticlePage({
  article,
  artistPicture,
  assets,
  draft,
  error,
  icons,
}: PropsType) {
  const { addReadArticle } = useStorageContext();

  useEffect(() => {
    if (article) addReadArticle(article);
  }, [article, addReadArticle]);

  if (error || article === undefined) return <ArticleError />;

  if (draft) return <ArticleDraft />;

  return (
    <ArticleContent
      article={article}
      artistPicture={artistPicture}
      assets={assets}
      icons={icons}
    />
  );
}
