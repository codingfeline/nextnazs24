import Reveal from '@/app/components/Reveal'
import React from 'react'

interface Props {
  children: React.ReactNode
}
const RevealPlayGround = ({ children }: Props) => {
  return (
    <Reveal delay={300} distance={3}>
      {children}
    </Reveal>
  )
}

export default RevealPlayGround
