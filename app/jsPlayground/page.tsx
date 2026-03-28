import dynamic from 'next/dynamic'
import Link from 'next/link'
import React from 'react'
import MainPage from '../components/MainPage'

const LeapYear = dynamic(() => import('./components/leapYear'))
const TitleCase = dynamic(() => import('./components/ChangeCase'))
const shoppingCart = dynamic(() => import('../components/shoppingCart')) // Example of another component
const viewMap: Record<string, React.ComponentType> = {
  leap: LeapYear,
  case: TitleCase,
  cart: shoppingCart,
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
      <div className="text-gray-300 gap-2 ">
        <h2>JS Playground</h2>
        <div className=" gap-2">
          <nav className="w-full gap-1 p-4 flex text-gray-200 ">
            <Link
              href="/jsPlayground?view=leap"
              className={`p-2 rounded ${currentView === 'leap' ? 'bg-blue-500 ' : 'hover:bg-blue-400'}`}
            >
              Leap Year
            </Link>

            <Link
              href="/jsPlayground?view=case"
              className={`p-2 rounded ${currentView === 'case' ? 'bg-blue-500 ' : 'hover:bg-blue-400'}`}
            >
              Change Cases
            </Link>
            <Link
              href="/jsPlayground?view=cart"
              className={`p-2 rounded ${currentView === 'cart' ? 'bg-blue-500 ' : 'hover:bg-blue-400'}`}
            >
              Shopping Cart
            </Link>
          </nav>
          <SelectedComponent />
        </div>
      </div>
    </MainPage>
  )
}

export default JsPlayground
