import FilterJournals from '@/app/journals/_components/filterJournals'
import prisma from '@/prisma/client'
// import parse from 'html-react-parser'
import { redirect } from 'next/navigation'

export default async function Home() {
  redirect('https://google.com')
  // const dataToParse = '<span>**</span>'
  // const chilli = '<GiChiliPepper />'
  const journals = await prisma.journals.findMany()
  const topics = journals.map(j => ({
    topic: j.topic,
    id: j.id,
  }))
  // redirect('http://google.com')

  // const replacement = reactStringReplace(dataToParse, '*', (match, i) => (
  //   <GiChiliPepper key={i} />
  // ))

  return (
    <main className="grow bg_home bg-gray-200">
      <FilterJournals topics={topics} />
    </main>
    // <div className="flex  items-center  w-full   ">
    //   <Container>
    //   </Container>
    // </div>
  )
}
export const dynamic = 'force-dynamic'
