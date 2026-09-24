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

const UNTITLED_ASSET_TITLE = "untitled";

function toNonEmptyText(value: string | null | undefined) {
  const text = value?.trim();
  return text ? text : undefined;
}

function isUntitled(title: string) {
  return title.toLowerCase() === UNTITLED_ASSET_TITLE;
}

function toCaption(title: string | null | undefined) {
  const text = toNonEmptyText(title);
  return text && !isUntitled(text) ? text : undefined;
}

export function Asset({ asset, imageStyle, withLightBox = false }: PropsType) {
  const caption = toCaption(asset.title);
  const attribution = toNonEmptyText(asset.description);
  const hasCaption = caption !== undefined || attribution !== undefined;
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
            alt={caption ?? ""}
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
            caption={caption}
            attribution={attribution}
          />
        )}
      </div>
      {hasCaption && (
        <figcaption>
          {caption && <p style={captionTextStyle}>{caption}</p>}
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
