export default function YoutubeVideoEmbedder({ url }: { url: string }) {
  const id = url.split('/').slice(-1)
  if (!url) return <></>
  return (
    <iframe
      style={{
        borderWidth: 8,
        borderImageOutset: 0,
        borderImageSource: 'url(/picture-frame.png)',
        borderImageSlice: 16,
        borderImageRepeat: 'round',
        borderImageWidth: 1.5,
      }}
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${id}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  )
}
