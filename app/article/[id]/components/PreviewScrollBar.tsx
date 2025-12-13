import React from "react";

import { ContentfulAsset } from "../../../../types";
import GalleryItem from "./GalleryItem";

interface PropsType {
  assets: ContentfulAsset[];
  setSelectedAsset: (assert: ContentfulAsset) => void;
}

export default function PreviewScrollBar({
  assets = [],
  setSelectedAsset,
}: PropsType) {
  return (
    <ul
      style={{
        display: "grid",
        gap: "0.125rem",
        minWidth: "100%",
        maxWidth: "100%",
        overflowX: "scroll",
        gridRow: "1fr",
        gridAutoFlow: "column",
        padding: "0 0.25rem",
        overflowY: "hidden",
      }}
    >
      {assets.map((asset, n) => (
        <li
          key={`asset-${n}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setSelectedAsset(asset)}
        >
          <GalleryItem asset={asset} isThumbnail />
        </li>
      ))}
    </ul>
  );
}
