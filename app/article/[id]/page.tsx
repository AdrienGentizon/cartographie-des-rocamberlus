import { BLOCKS, Block, Inline, Text } from "@contentful/rich-text-types";

import { Metadata } from "next";
import { notFound } from "next/navigation";

import ArticlePage from "@/components/Pages/ArticlePage";
import getArticleFromId from "@/queries/getArticleFromId";
import getArtists from "@/queries/getArtists";
import getAssetFromId from "@/queries/getAssetFromId";
import getAssetsCollection from "@/queries/getAssetsCollection";
import { TITLES } from "@/utils/assetsIds";
import env from "@/utils/env";
import { ValidArticle } from "@/utils/types";

const SITE_TITLE = "Cartographie des rocamberlus";
const DESCRIPTION_MAX_LENGTH = 155;

function extractText(node: Block | Inline | Text): string {
  if (node.nodeType === "text") return (node as Text).value;
  return (node as Block | Inline).content.map(extractText).join("");
}

function extractParagraphsText(article: ValidArticle) {
  return article.articleText.json.content
    .filter((node) => node.nodeType === BLOCKS.PARAGRAPH)
    .map(extractText)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncateOnWord(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");
  const cutIndex = lastSpaceIndex > 0 ? lastSpaceIndex : maxLength;
  return `${truncated.slice(0, cutIndex)}…`;
}

function buildVisitSentence(title: string | undefined) {
  return title
    ? `Visite de l'environnement « ${title} ».`
    : "Visite d'un environnement d'art singulier.";
}

function getArticleDescription(article: ValidArticle) {
  const visitSentence = buildVisitSentence(article.title?.trim() || undefined);
  const description = [visitSentence, extractParagraphsText(article)]
    .filter(Boolean)
    .join(" ");
  return truncateOnWord(description, DESCRIPTION_MAX_LENGTH);
}

function getArticleTitle(article: ValidArticle) {
  const title = article.title?.trim();
  return title ? `${title} | ${SITE_TITLE}` : SITE_TITLE;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { article } = await getArticleFromId(id);
  const canonical = `${env().BASE_URL}/article/${id}`;

  if (!article) return { alternates: { canonical } };

  return {
    title: getArticleTitle(article),
    description: getArticleDescription(article),
    alternates: { canonical },
  };
}

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
  if (!article && !error) notFound();
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
