import VideoPlayer from '../components/VideoPlayer'

export default function page() {
  return (
    <>
      <VideoPlayer
        path="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        title="Seasalter"
      ></VideoPlayer>
    </>
  )
}
