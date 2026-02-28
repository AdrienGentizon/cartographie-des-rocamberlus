import { CSSProperties } from "react";

import { ContentfulAsset } from "../../utils/types";
import { ContentfulImage } from "../ContentfulImage/ContentfulImage";
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
