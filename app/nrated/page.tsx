'use client'

import { useState } from 'react'
import VideoPlayer from '../components/VideoPlayer'

interface VideoData {
  path: string
  poster?: string
  title: string
}

const Vids = [
  {
    path: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    title: 'Tears of Steel',
  },
  {
    path: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    title: "Elephant's Dream",
  },
  {
    path: 'https://photos.app.goo.gl/z8QEnjdQ8oLXm4h59',
    title: 'G Drive',
  },
]

export default function Page() {
  const [selectedVid, setSelectedVid] = useState<VideoData>(Vids[0])

  const handleVidSelect = (video: VideoData) => setSelectedVid(video)

  return (
    <>
      <ul>
        {Vids.map((vid, index) => (
          <li key={index}>
            <p
              className="cursor-pointer text-[white] hover:text-[green]"
              onClick={() => handleVidSelect(vid)}
            >
              {vid.title}
            </p>
          </li>
        ))}
      </ul>
      <VideoPlayer path={selectedVid.path} title={selectedVid.title}></VideoPlayer>
    </>
  )
}
