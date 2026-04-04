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
        className={`relative  p-4 mt-6 rounded-md border border-dashed ${show ? 'border-gray-400 bg-gray-200' : 'border-gray-100 bg-gray-100'}`}
      >
        {/* Clickable centered title */}
        <button
          onClick={() => setShow(!show)}
          className={`absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-200 px-4 text-sm font-medium text-gray-700 cursor-pointer hover:text-black transition flex gap-2 items-center rounded-md border border-gray-400 p-1 ${show ? '' : 'border-dashed'}`}
        >
          <Cpu size={20} title="CPU" />
          {header} {show ? <Minus size={16} /> : <Plus size={16} />}
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            show ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
          }`}
        >
          {children}
        </div>
      </div>
    </Reveal>
  )
}

export default BrainsContainer
