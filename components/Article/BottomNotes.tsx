import {
  Options,
  documentToReactComponents,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

import React, { ReactNode } from "react";

import { ContentfulImage } from "@/components/ContentfulImage/ContentfulImage";
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
    <div className="flex flex-col">
      {icon ? (
        <ContentfulImage
          asset={icon}
          alt={icon.description ?? ""}
          className="h-auto w-56 origin-left object-contain"
          sizes="224px"
        />
      ) : (
        <p className="underline">{title}:</p>
      )}
      <div className="flex flex-col gap-2">{children}</div>
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
    <ul className="flex flex-col gap-5">
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
