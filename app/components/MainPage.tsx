import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  bg?: string
}

const MainPage = ({ children, bg }: Props) => {
  return <main className={`grow ${bg}`}>{children}</main>
}

export default MainPage
