import Image, { ImageProps } from "next/image";

function contentfulImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  return `${src}?w=${width}&q=${quality ?? 75}&fm=webp`;
}

type ImageAsset = {
  url: string;
  width: number;
  height: number;
  title?: string | null;
  description?: string | null;
};

type Props = { asset: ImageAsset; alt?: string } & Omit<
  ImageProps,
  "src" | "alt" | "loader"
>;

export function ContentfulImage({ asset, alt, ...props }: Props) {
  const sizeProps = props.fill
    ? {}
    : { width: asset.width, height: asset.height };

  return (
    <Image
      src={asset.url}
      alt={alt ?? asset.description ?? asset.title ?? ""}
      loader={contentfulImageLoader}
      {...sizeProps}
      {...props}
    />
  );
}
