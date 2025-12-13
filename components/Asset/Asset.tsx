import React, { CSSProperties } from "react";

import Image from "next/image";

import { ContentfulAsset } from "../../types";
import CustomBorderDiv from "../CustomBorderDiv/CustomBorderDiv";

interface PropsType {
  asset: ContentfulAsset;
  imageStyle?: CSSProperties;
}

export function Asset({ asset, imageStyle }: PropsType) {
  const getDescription = () => {
    if (asset.description && asset.description !== "") return asset.description;
    if (asset.title && asset.title !== "") return asset.title;
    return null;
  };

  return (
    <div>
      <CustomBorderDiv
        style={{
          display: "flex",
          width: "fit-content",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
        }}
      >
        <Image
          src={asset.url}
          alt={asset.description ?? asset.title ?? ""}
          width={asset.width}
          height={asset.height}
          style={{
            boxShadow: "inset 0 0 10px white",
            borderRadius: 6,
            padding: 2,
            maxHeight: 480,
            ...imageStyle,
          }}
        />
      </CustomBorderDiv>
      {getDescription() !== null && (
        <p
          style={{
            fontWeight: 100,
            fontSize: "0.75rem",
            lineHeight: "1rem",
            maxWidth: imageStyle?.maxWidth,
            margin: "0 auto",
          }}
        >
          {getDescription()}
        </p>
      )}
    </div>
  );
}
