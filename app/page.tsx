import prisma from '@/prisma/client'
import { Container } from '@radix-ui/themes'
// import parse from 'html-react-parser'
import moment from 'moment'
import { GiChiliPepper } from 'react-icons/gi'
import reactStringReplace from 'react-string-replace'

export default async function Home() {
  const dataToParse = '<span>**</span>'
  // const chilli = '<GiChiliPepper />'
  const journals = await prisma.journals.findMany()

  const replacement = reactStringReplace(dataToParse, '*', (match, i) => (
    <GiChiliPepper key={i} />
  ))

  return (
    <div className="flex flex-col p-1 pb-20 bg-gray-200 justify-around items-center m-1 max-w-3xl  ">
      <Container>
        <h1>home</h1>
        {/* {parse(dataToParse)} */}
        {/* lorem500 <br /> */}
        {/* {parse(chilli)} */}
        {/* {replacement}
      <span></span>
      {journals.length} */}
        {journals.map(j => {
          // const formattedDate = j.date.getFullYear() + ' -- ' + j.date.toTimeString()
          return (
            <div className="bg-gray-50  p-2 m-2 rounded-md" key={j.id}>
              <div>{j.topic}</div>
              {j.comment}
              <p>{j.date.toISOString()}</p>
              {/* <p>{formattedDate}</p> */}
              {moment(j.date).format('DD MMM YYYY - HH:MM ')}
            </div>
          )
        })}
      </Container>
    </div>
  )
}
