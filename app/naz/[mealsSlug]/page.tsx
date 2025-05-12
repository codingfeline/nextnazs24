import mylogo from '@/assets/nextjs.jpg'
import Image from 'next/image'

export default function MySlug() {
  return (
    <>
      <h1>Slugs</h1>
      {/* <img src={mylogo} alt="test"  /> */}
      <Image src={mylogo} width="200" height="200" alt="test" />
    </>
  )
}
