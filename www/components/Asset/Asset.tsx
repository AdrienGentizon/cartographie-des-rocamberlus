import { CSSProperties } from "react";

import { ContentfulAsset } from "../../utils/types";
import { ContentfulImage } from "../ContentfulImage/ContentfulImage";
import CustomBorderDiv, {
  CUSTOM_BORDER_WIDTH,
} from "../CustomBorderDiv/CustomBorderDiv";

interface PropsType {
  asset: ContentfulAsset;
  imageStyle?: CSSProperties;
  preload?: boolean;
}

const UNTITLED_ASSET_TITLE = "untitled";
const MAX_IMAGE_HEIGHT = "70svh";

function toFrameWidth(asset: ContentfulAsset) {
  const aspectRatio = asset.width / asset.height;
  const bordersWidth = 2 * CUSTOM_BORDER_WIDTH;
  return `min(100%, calc(${MAX_IMAGE_HEIGHT} * ${aspectRatio} + ${bordersWidth}px))`;
}

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

export function Asset({ asset, imageStyle, preload = false }: PropsType) {
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
      <CustomBorderDiv
        className="mx-auto"
        style={{ width: toFrameWidth(asset) }}
      >
        <ContentfulImage
          className="block h-auto w-full"
          asset={asset}
          alt={caption ?? ""}
          sizes="(max-width: 768px) 90dvw, 720px"
          preload={preload}
          style={{
            boxShadow: "inset 0 0 10px white",
          }}
        />
      </CustomBorderDiv>
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
