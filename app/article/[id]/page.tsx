import { Metadata } from "next";

import getArticleFromId from "@/queries/getArticleFromId";
import getArtists from "@/queries/getArtists";
import getAssetFromId from "@/queries/getAssetFromId";
import getAssetsCollection from "@/queries/getAssetsCollection";
import { TITLES } from "@/utils/assetsIds";
import { ValidArticle } from "@/utils/types";

import ArticlePage from "./components/ArticlePage";

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.cartographie-des-rocamberlus.com/article/1tSKGhWoQldll52ToIw4uh`,
  },
};
async function getArticleContent(params: { id: string }) {
  const { article, error, draft } = await getArticleFromId(params.id ?? "");
  if (article?.artistPicture?.sys?.id) {
    return {
      article,
      error,
      draft,
      artistPicture: await getAssetFromId(article.artistPicture.sys.id),
    };
  }
  return { article, error, draft, artistPicture: undefined };
}

async function getIcons() {
  const assets = await getAssetsCollection(Object.values(TITLES));

  return {
    references: assets.find(({ sys }) => sys.id === TITLES.references),
    webography: assets.find(({ sys }) => sys.id === TITLES.webography),
    media: assets.find(({ sys }) => sys.id === TITLES.media),
    gallery: assets.find(({ sys }) => sys.id === TITLES.gallery),
  };
}

async function getArticleAssets(article: ValidArticle | undefined) {
  if (!article) return [];
  const ids = article.articleText.json.content.reduce((acc: string[], curr) => {
    if (curr.nodeType === "embedded-asset-block") {
      return [...acc, curr.data.target.sys.id];
    }
    return acc;
  }, []);

  return await getAssetsCollection(ids);
}

export async function generateStaticParams() {
  const { artists } = await getArtists();

  return artists.map((artist) => ({
    id: artist.articleId,
  }));
}

export default async function Article({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [{ article, error, draft, artistPicture }, icons] = await Promise.all([
    getArticleContent(await params),
    getIcons(),
  ]);
  const assets = await getArticleAssets(article);
  return (
    <ArticlePage
      article={article}
      artistPicture={artistPicture}
      assets={assets}
      icons={icons}
      draft={draft ?? false}
      error={error}
    />
  );
}
