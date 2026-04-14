import Reveal from '@/app/components/Reveal'
import React from 'react'

interface Props {
  children: React.ReactNode
}
const RevealPlayGround = ({ children }: Props) => {
  return (
    <Reveal delay={400} distance={5}>
      {children}
    </Reveal>
  )
}

export default RevealPlayGround
