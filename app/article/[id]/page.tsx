import { BLOCKS, Block, Inline, Text } from "@contentful/rich-text-types";

import { Metadata } from "next";
import { notFound } from "next/navigation";

import ArticlePage from "@/components/Pages/ArticlePage";
import getArticleFromId from "@/queries/getArticleFromId";
import getArtists from "@/queries/getArtists";
import getAssetsCollection from "@/queries/getAssetsCollection";
import { TITLES } from "@/utils/assetsIds";
import env from "@/utils/env";
import { ContentfulAsset, ValidArticle } from "@/utils/types";

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

const OPEN_GRAPH_IMAGE_WIDTH = 1200;
const OPEN_GRAPH_IMAGE_HEIGHT = 630;

function findFirstEmbeddedAssetId(article: ValidArticle) {
  const firstEmbeddedAsset = article.articleText.json.content.find(
    (node) => node.nodeType === BLOCKS.EMBEDDED_ASSET
  );
  return firstEmbeddedAsset?.data.target.sys.id as string | undefined;
}

function getOpenGraphImage(article: ValidArticle, assets: ContentfulAsset[]) {
  const assetId = findFirstEmbeddedAssetId(article);
  const asset = assets.find(({ sys }) => sys.id === assetId);
  if (!asset?.url || !asset.contentType?.startsWith("image/")) return undefined;
  return {
    url: `${asset.url}?w=${OPEN_GRAPH_IMAGE_WIDTH}&h=${OPEN_GRAPH_IMAGE_HEIGHT}&fit=fill&fm=jpg`,
    width: OPEN_GRAPH_IMAGE_WIDTH,
    height: OPEN_GRAPH_IMAGE_HEIGHT,
    alt: article.title?.trim() || SITE_TITLE,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { article, assets, error } = await getArticleFromId(id);
  const canonical = `${env().BASE_URL}/article/${id}`;

  if (error) throw error;
  if (!article) return { alternates: { canonical } };

  const title = getArticleTitle(article);
  const description = getArticleDescription(article);
  const image = getOpenGraphImage(article, assets);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      locale: "fr_FR",
      siteName: SITE_TITLE,
      url: canonical,
      title,
      description,
      images: image ? [image] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image.url] : undefined,
    },
  };
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

export async function generateStaticParams() {
  const { artists, error } = await getArtists();
  if (error) throw error;

  return artists.map((artist) => ({
    id: artist.articleId,
  }));
}

export default async function Article({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [{ article, assets, artistPicture, error, draft }, icons] =
    await Promise.all([getArticleFromId(id), getIcons()]);
  if (error) throw error;
  if (!article) notFound();
  return (
    <ArticlePage
      article={article}
      artistPicture={artistPicture}
      assets={assets}
      icons={icons}
      draft={draft ?? false}
    />
  );
}
