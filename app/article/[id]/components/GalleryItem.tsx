import Image from "next/image";

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
    <Image
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
      src={asset.url}
      width={asset.width}
      height={asset.height}
      alt={asset.description ?? asset.title ?? ""}
    />
  );
}
