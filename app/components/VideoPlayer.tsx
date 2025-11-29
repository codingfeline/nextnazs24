interface VideoProps {
  path: string
  poster?: string
  title: string
}

export default function VideoPlayer({ path, poster, title }: VideoProps) {
  return (
    <div style={{ padding: '10px' }}>
      <h2 className="text-black bg-[gray] text-center border border-#145f9c-500">
        {title}
      </h2>
      <div style={{ border: '1px solid #ccc' }}>
        <video
          src={path}
          poster={poster}
          autoPlay
          controls
          playsInline
          style={{ display: 'block' }}
        ></video>
      </div>
    </div>
  )
}
