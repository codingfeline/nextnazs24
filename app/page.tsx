import parse from 'html-react-parser'
import { GiChiliPepper } from 'react-icons/gi'
import reactStringReplace from 'react-string-replace'

export default function Home() {
  const dataToParse = '<span>**</span>'
  // const chilli = '<GiChiliPepper />'

  const replacement = reactStringReplace(dataToParse, '*', (match, i) => (
    <GiChiliPepper key={i} />
  ))

  return (
    <div className="flex flex-col p-8 pb-20 bg-gray-200 justify-around items-center m-1">
      <h1>home</h1>
      {parse(dataToParse)}
      lorem500 <br />
      {/* {parse(chilli)} */}
      {replacement}
      <span></span>
    </div>
  )
}
