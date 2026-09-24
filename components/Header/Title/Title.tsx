"use client";
import React from "react";

import { usePathname } from "next/navigation";

import { ContentfulImage } from "../../../components/ContentfulImage/ContentfulImage";
import { HOME_URL } from "../../../utils/routes";
import Link from "../../Link/Link";

interface PropsType {
  title?: string;
  mainTitlePicture?: { url: string; width: number; height: number } | null;
}

export default function Title({ title, mainTitlePicture }: PropsType) {
  const pathname = usePathname();
  const Heading = pathname === HOME_URL ? "h1" : "p";

  if (mainTitlePicture)
    return (
      <Link href={`/`}>
        <Heading className="sr-only">{title}</Heading>
        <ContentfulImage
          asset={mainTitlePicture}
          alt=""
          aria-hidden
          preload
          style={{ cursor: "pointer" }}
          sizes="(max-width: 768px) 359px, 688px"
        />
      </Link>
    );

  if (title)
    return (
      <Link href={`/`}>
        <div
          style={{
            textAlign: "center",
            paddingTop: "0.5rem",
            cursor: "pointer",
          }}
        >
          <Heading
            style={{
              textTransform: "uppercase",
              fontWeight: 100,
            }}
          >
            {title}
          </Heading>
        </div>
      </Link>
    );
  return <></>;
}
