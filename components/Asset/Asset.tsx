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

const DEFAULT_DIALOG_LABEL = "Image en entier";

function toNonEmptyText(value: string | null | undefined) {
  const text = value?.trim();
  return text ? text : undefined;
}

export function Asset({ asset, imageStyle, withLightBox = false }: PropsType) {
  const description = toNonEmptyText(asset.description);
  const attribution = toNonEmptyText(asset.title);
  const hasCaption = description !== undefined || attribution !== undefined;
  const captionTextStyle: CSSProperties = {
    fontWeight: 100,
    fontSize: "0.75rem",
    lineHeight: "1rem",
    maxWidth: imageStyle?.maxWidth,
    margin: "0 auto",
  };

  return (
    <figure>
      <div className="relative">
        <CustomBorderDiv className="relative flex aspect-square">
          <ContentfulImage
            className="object-cover"
            asset={asset}
            alt={description ?? ""}
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
            dialogLabel={description ?? DEFAULT_DIALOG_LABEL}
          />
        )}
      </div>
      {hasCaption && (
        <figcaption>
          {description && <p style={captionTextStyle}>{description}</p>}
          {attribution && (
            <p className="attribution" style={captionTextStyle}>
              {attribution}
            </p>
          )}
        </figcaption>
      )}
    </figure>
  );
}
