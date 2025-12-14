import React from "react";

import { ContentfulAsset } from "../../../../utils/types";

interface PropsType {
  assets: ContentfulAsset[];
  selectedAsset: ContentfulAsset | undefined;
}

export default function Pagination({ assets, selectedAsset }: PropsType) {
  return (
    <ul
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
      }}
    >
      {assets.map((asset, n) => (
        <li key={`page-${n}`}>
          <div
            style={{
              borderRadius: "100vh",
              mixBlendMode: "difference",
              background:
                asset.url === selectedAsset?.url
                  ? "hsla(0, 0%, 100%, 1)"
                  : "hsla(0, 0%, 100%, 0.4)",
              width: 6,
              height: 6,
            }}
          />
        </li>
      ))}
    </ul>
  );
}
