import { ContentfulImage } from "@/components/ContentfulImage/ContentfulImage";
import { ContentfulAsset } from "@/utils/types";

export default function GalleryItem({
  asset,
  isThumbnail = false,
}: {
  asset: ContentfulAsset;
  isThumbnail?: boolean;
}) {
  if (!asset?.url) return <></>;
  return (
    <ContentfulImage
      asset={asset}
      style={
        isThumbnail
          ? {
              maxWidth: 120,
              maxHeight: 80,
              objectFit: "cover",
              objectPosition: "center",
            }
          : {
              maxWidth: 650,
              maxHeight: 500,
              objectFit: "contain",
            }
      }
    />
  );
}
