import { useState } from 'react'
import { Cpu, Minus, Plus } from '.'
import Reveal from './Reveal'

interface Props {
  children: React.ReactNode
  header?: string
}
const BrainsContainer = ({ children, header = 'the main logic' }: Props) => {
  const [show, setShow] = useState(false)
  return (
    <Reveal delay={400} direction="right">
      <div
        className={`relative  p-4 mt-8 rounded-md border border-dashed ${show ? 'border-gray-400 ]' : 'border-gray-100'} transition-colors  `}
      >
        {/* Title styled like a legend */}
        <span
          className="gap-2 absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-300 px-2 text-sm font-medium text-gray-700 rounded-md w-2/3 flex items-center justify-between p-1 border border-gray-600 border-dashed font-['Arial Narrow'] cursor-pointer hover:bg-gray-200 transition-colors"
          onClick={() => setShow(!show)}
        >
          <Cpu size={20} title="CPU" />
          {header}
          {show ? <Minus /> : <Plus />}
        </span>
        {/* {show  && <div className="mt-3">{children}</div>} */}
        <div className={`mt-3 ${show ? '' : 'hidden'}`}>{children}</div>
      </div>
    </Reveal>
  )
}

export default BrainsContainer
