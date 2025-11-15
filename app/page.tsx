import prisma from '@/prisma/client'
import { Container } from '@radix-ui/themes'
import FilterJournals from './journals/_components/filterJournals'
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
    <div className="flex  items-center  w-full   ">
      <Container>
        {/* {JSON.stringify(topics)} */}
        <FilterJournals topics={topics} />
        {/* <Image alt="logo" src={logo} className="" width="100" /> */}
      </Container>
    </div>
  )
}
export const dynamic = 'force-dynamic'
