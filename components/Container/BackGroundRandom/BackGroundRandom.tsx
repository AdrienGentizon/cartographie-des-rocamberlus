/* eslint-disable react-hooks/purity */
import React, { ReactNode } from "react";

import Image from "next/image";

import { ContentfulAsset } from "../../../types";

const ITEM_DENSITY = 0.85;
const ITEM_ROTATION = 0;

export function BackGroundRandom({
  assets,
  children,
}: {
  assets: ContentfulAsset[];
  children: ReactNode;
}) {
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div
        className="random-background"
        style={{
          height: "100%",
        }}
      >
        {Array.from({ length: 10000 }).map((_, n) => {
          const asset = assets.at(Math.floor(assets.length * Math.random()));

          if (Math.random() < ITEM_DENSITY || !asset)
            return <div key={`empty-div-${n}`} />;

          return (
            <Image
              key={`empty-div-${n}`}
              style={{
                rotate: `${ITEM_ROTATION * (-1 * Math.random() + 0.5)}deg`,
                transform: Math.random() > 0.5 ? `rotateY(180deg)` : undefined,
                objectFit: "contain",
              }}
              src={asset.url}
              width={asset.width}
              height={asset.height}
              alt={asset.description ?? asset.title ?? ""}
            />
          );
        })}
      </div>
      {children}
    </div>
  );
}
