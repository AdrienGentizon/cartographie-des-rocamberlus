"use client";
import React from "react";

import { usePathname } from "next/navigation";

import { ContentfulImage } from "../../../../components/ContentfulImage/ContentfulImage";
import { ContentfulAsset } from "../../../../utils/types";
import Link from "../../../Link/Link";

type MenuItemProps = React.PropsWithChildren<{
  url: string;
  title: string;
  asset?: ContentfulAsset;
}>;

export default function MenuItem({ url, asset, title }: MenuItemProps) {
  const pathname = usePathname();

  return (
    <>
      <li className={pathname === url ? "nav-link active" : "nav-link"}>
        <Link href={url}>
          <span className="sr-only">{title}</span>
          {asset && (
            <ContentfulImage asset={asset} aria-hidden sizes="(max-width: 768px) 70px, 128px" />
          )}
          {!asset && <>{title}</>}
        </Link>
      </li>
    </>
  );
}
