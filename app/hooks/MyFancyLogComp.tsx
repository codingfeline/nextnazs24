'use client'

import { fancyLog } from '@/app/hooks/fancyLog'

interface Props {
  txt: string
  back: string
  colour: string
}

const MyFancyLogComp = ({ txt, back, colour }: Props) => {
  fancyLog(txt, back, colour)
  return <></>
}

export default MyFancyLogComp
