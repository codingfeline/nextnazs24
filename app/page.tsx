// import prisma from '@/prisma/client'
// import parse from 'html-react-parser'

import { Container } from '@radix-ui/themes'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Those Utilities — Word Unscrambler, Case Converter & Password Generator',
  description:
    'Free browser-based utilities: unscramble words from a set of letters, convert text between Title, Upper and Lower case, and generate secure passwords with custom options.',
  keywords: [
    'word unscrambler',
    'anagram solver',
    'case converter',
    'title case',
    'password generator',
    'secure password',
    'online tools',
    'text utilities',
  ],
  openGraph: {
    title: 'Those Utilities',
    description:
      'Unscramble words, convert text case, and generate secure passwords — all in the browser.',
    type: 'website',
  },
}

import HomeFeatureGrid from './_components/HomeFeatureGrid'
export default async function Home() {
  // redirect('https://google.com')
  // const dataToParse = '<span>**</span>'
  // const chilli = '<GiChiliPepper />'
  // const journals = await prisma.journals.findMany()
  // const topics = journals.map(j => ({
  //   topic: j.topic,
  //   id: j.id,
  // }))

  // const replacement = reactStringReplace(dataToParse, '*', (match, i) => (
  //   <GiChiliPepper key={i} />
  // ))

  return (
    <main className="grow bg_home bg-gray-200">
      <h2 className="text-center text-gray-300 mt-2">Those Utilities</h2>
      <Container>
        {/* <FilterJournals topics={topics} /> */}
        <HomeFeatureGrid />
      </Container>
    </main>
    // <div className="flex  items-center  w-full   ">
    //   <Container>
    //   </Container>
    // </div>
  )
}
export const dynamic = 'force-dynamic'
