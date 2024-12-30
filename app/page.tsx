import prisma from '@/prisma/client'
import { Container } from '@radix-ui/themes'
// import parse from 'html-react-parser'

export default async function Home() {
  // const dataToParse = '<span>**</span>'
  // const chilli = '<GiChiliPepper />'
  const journals = await prisma.journals.findMany()

  // const replacement = reactStringReplace(dataToParse, '*', (match, i) => (
  //   <GiChiliPepper key={i} />
  // ))

  return (
    <div className="flex flex-col  justify-around items-center  max-w-3xl text-white  ">
      <Container>
        {/* {parse(dataToParse)} */}
        {/* lorem500 <br /> */}
        {/* {parse(chilli)} */}
        {/* {replacement}
      <span></span>
      {journals.length} */}
        {journals.map(j => {
          // const formattedDate = j.date.getFullYear() + ' -- ' + j.date.toTimeString()
          return (
            <div className="rounded-md" key={j.id}>
              {/* <div>{j.topic}</div>
              <p>{j.date.toISOString()}</p>
              {moment(j.date).format('DD MMM YYYY - HH:MM ')} */}
            </div>
          )
        })}
      </Container>
    </div>
  )
}
