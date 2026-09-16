import { CSSProperties } from "react";

import { ContentfulAsset } from "../../utils/types";
import { ContentfulImage } from "../ContentfulImage/ContentfulImage";
import CustomBorderDiv from "../CustomBorderDiv/CustomBorderDiv";
import LightBoxButton from "./LightBoxButton";

interface PropsType {
  asset: ContentfulAsset;
  imageStyle?: CSSProperties;
  withLightBox?: boolean;
}

export function Asset({ asset, imageStyle, withLightBox = false }: PropsType) {
  const getDescription = () => {
    const useTitleAsFallBack = true;
    if (asset.description && asset.description !== "") return asset.description;
    if (useTitleAsFallBack && asset.title && asset.title !== "")
      return asset.title;

    return null;
  };

  return (
    <div>
      <div className="relative">
        <CustomBorderDiv className="relative flex aspect-square">
          <ContentfulImage
            className="object-cover"
            asset={asset}
            fill
            sizes="(max-width: 768px) 90dvw, 720px"
            preload
            style={{
              boxShadow: "inset 0 0 10px white",
            }}
          />
        </CustomBorderDiv>
        {withLightBox && (
          <LightBoxButton
            asset={asset}
            dialogLabel={getDescription() ?? asset.title ?? "Image en entier"}
          />
        )}
      </div>
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
