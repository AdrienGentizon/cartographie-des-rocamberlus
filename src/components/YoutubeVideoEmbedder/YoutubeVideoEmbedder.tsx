export default function YoutubeVideoEmbedder({ url }: { url: string }) {
  const id = url.split('/').at(-1)
  return (
    <div className="flex justify-center py-4">
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  )
}
