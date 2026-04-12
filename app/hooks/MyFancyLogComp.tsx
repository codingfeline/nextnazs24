'use client'

import { fancyLog } from '@/app/hooks/fancyLog'

interface Props {
  txt: string
  back: string
  colour: string
  now?: string
}

const MyFancyLogComp = ({ txt, back, colour, now = undefined }: Props) => {
  fancyLog(txt, back, colour, now)
  return <></>
}

export default MyFancyLogComp
