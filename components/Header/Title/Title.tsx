import React from "react";

import Image from "next/image";

import Link from "../../Link/Link";

interface PropsType {
  title?: string;
  mainTitlePicture?: { url: string; width: number; height: number } | null;
}

export default function Title({ title, mainTitlePicture }: PropsType) {
  if (mainTitlePicture)
    return (
      <Link href={`/`}>
        <h1 className="sr-only">{title}</h1>
        <Image
          aria-hidden
          style={{ cursor: "pointer" }}
          src={mainTitlePicture.url}
          alt={""}
          width={mainTitlePicture.width}
          height={mainTitlePicture.height}
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
