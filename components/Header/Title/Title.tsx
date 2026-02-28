import React from "react";

import Link from "../../Link/Link";
import { ContentfulImage } from "../../../components/ContentfulImage/ContentfulImage";

interface PropsType {
  title?: string;
  mainTitlePicture?: { url: string; width: number; height: number } | null;
}

export default function Title({ title, mainTitlePicture }: PropsType) {
  if (mainTitlePicture)
    return (
      <Link href={`/`}>
        <h1 className="sr-only">{title}</h1>
        <ContentfulImage
          asset={mainTitlePicture}
          alt=""
          aria-hidden
          style={{ cursor: "pointer" }}
          priority
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
          <h1
            style={{
              textTransform: "uppercase",
              fontWeight: 100,
            }}
          >
            {title}
          </h1>
        </div>
      </Link>
    );
  return <></>;
}
