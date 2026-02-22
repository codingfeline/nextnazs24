import dynamic from 'next/dynamic'
import Link from 'next/link'
import React from 'react'
import MainPage from '../components/MainPage'

const LeapYear = dynamic(() => import('./components/leapYear'))
const TitleCase = dynamic(() => import('./components/TitleCase'))
const viewMap: Record<string, React.ComponentType> = {
  leap: LeapYear,
  case: TitleCase,
}

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const JsPlayground = async ({ searchParams }: Props) => {
  const params = await searchParams
  const currentView = typeof params.view === 'string' ? params.view : 'leap'
  const SelectedComponent = viewMap[currentView] || LeapYear

  return (
    <MainPage bg="bg_nebula">
      <div className="text-gray-300 gap-2">
        <h2>JS Playground</h2>
        <div className=" gap-2">
          <nav className="w-64 gap-1 p-4 flex text-gray-200 ">
            <Link
              href="/jsPlayground?view=leap"
              className={`p-2 rounded ${currentView === 'leap' ? 'bg-blue-500 font-bold' : 'hover:bg-gray-100'}`}
            >
              Leap Year
            </Link>

            <Link
              href="/jsPlayground?view=case"
              className={`p-2 rounded ${currentView === 'case' ? 'bg-blue-500 font-bold' : 'hover:bg-gray-100'}`}
            >
              Title Case
            </Link>
          </nav>
          <SelectedComponent />
        </div>
      </div>
    </MainPage>
  )
}

export default JsPlayground
