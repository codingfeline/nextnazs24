import dynamic from 'next/dynamic'
import Link from 'next/link'
import React from 'react'
import MainPage from '../components/MainPage'
import Reveal from '../components/Reveal'

const LeapYear = dynamic(() => import('./components/leapYear'))
const TitleCase = dynamic(() => import('./components/ChangeCase'))
const shoppingCart = dynamic(() => import('../components/shoppingCart')) // Example of another component
// const Utilities = dynamic(() => import('../components/utilities')) // Example of another component
const Pin = dynamic(() => import('../components/PinGenerator')) // Example of another component
const Temperature = dynamic(() => import('../components/Temperature')) // Example of another component

const viewMap: Record<string, React.ComponentType> = {
  leap: LeapYear,
  case: TitleCase,
  cart: shoppingCart,
  pin: Pin,
  temp: Temperature,
  // utilities: Utilities,
}

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const JsPlayground = async ({ searchParams }: Props) => {
  const params = await searchParams
  const currentView = typeof params.view === 'string' ? params.view : 'leap'
  const SelectedComponent = viewMap[currentView] || LeapYear
  const links = [
    { href: '/jsPlayground?view=leap', label: 'Leap Year', view: 'leap' },
    { href: '/jsPlayground?view=case', label: 'Case Converter', view: 'case' },
    { href: '/jsPlayground?view=cart', label: 'Shopping Cart', view: 'cart' },
    { href: '/jsPlayground?view=pin', label: 'PIN Generator', view: 'pin' },
    { href: '/jsPlayground?view=temp', label: 'Temperature Converter', view: 'temp' },
    // { href: '/jsPlayground?view=utilities', label: 'Utilities', view: 'utilities' },
  ]

  return (
    <MainPage bg="bg_nebula">
      <div className="text-gray-300 p-4 ">
        {/* <h2 className="text-gray-100">JS Playground</h2> */}
        <div className=" gap-2">
          <Reveal direction="left">
            <nav className="w-full gap-1 p-4 flex text-gray-200 ">
              {links.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`p-2 rounded ${currentView === link.view ? 'bg-blue-500 ' : 'hover:bg-blue-400 bg-gray-600'}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </Reveal>
          <SelectedComponent />
        </div>
      </div>
    </MainPage>
  )
}

export default JsPlayground
