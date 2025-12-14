export default function contentfulImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality: number;
}) {
  return `${src}?w=${width}&q=${quality || 75}&fm=webp`;
}
