import {
  Options,
  documentToReactComponents,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

import React, { ReactNode } from "react";

import Image from "next/image";

import { ContentfulAsset, ValidArticle } from "@/utils/types";

interface PropsType {
  article: ValidArticle;
  icons: {
    references: ContentfulAsset | undefined;
    webography: ContentfulAsset | undefined;
    media: ContentfulAsset | undefined;
  };
}

interface SectionPropsType {
  title: string;
  icon: ContentfulAsset | undefined;
}

function Section({
  title,
  icon,
  children,
}: React.PropsWithChildren<SectionPropsType>) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {icon ? (
        <Image
          src={icon.url}
          style={{
            scale: 0.5,
            transformOrigin: "left",
          }}
          width={icon.width}
          height={icon.height}
          alt={icon.description ?? ""}
        />
      ) : (
        <p
          style={{
            textDecoration: "underline",
          }}
        >
          {title}:
        </p>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function BottomNotes({ article, icons }: PropsType) {
  const renderOptions: Options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: unknown, children: ReactNode) => {
        return (
          <p className="text-left text-sm font-light not-italic lg:text-base lg:font-extralight">
            {children}
          </p>
        );
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [INLINES.HYPERLINK]: (node: any, children: ReactNode) => {
        return (
          <a
            className="cursor-pointer text-sm text-gray-500 underline hover:text-gray-800"
            target="_blank"
            href={node.data.uri}
            rel="noreferrer"
          >
            {children}
          </a>
        );
      },
    },
  };
  return (
    <ul
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {article.articleReferences && (
        <li>
          <Section icon={icons.references} title="Quelques références">
            {documentToReactComponents(
              article.articleReferences.json,
              renderOptions
            )}
          </Section>
        </li>
      )}
      {article.articleWebography && (
        <li>
          <Section icon={icons.webography} title="Webographie">
            {documentToReactComponents(
              article.articleWebography.json,
              renderOptions
            )}
          </Section>
        </li>
      )}
      {article.articleAvDocuments && (
        <li>
          <Section icon={icons.media} title="Documents audiovisuels">
            {documentToReactComponents(
              article.articleAvDocuments.json,
              renderOptions
            )}
          </Section>
        </li>
      )}
    </ul>
  );
}
