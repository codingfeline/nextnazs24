import dynamic from 'next/dynamic'
import React from 'react'
import MainPage from '../components/MainPage'
import Reveal from '../components/Reveal'
import ViewSwitcher from '../components/ViewSwitcher'

const LeapYear = dynamic(() => import('./components/leapYear'))
const TitleCase = dynamic(() => import('./components/ChangeCase'))
const shoppingCart = dynamic(() => import('./components/shoppingCart')) // Example of another component
// const Utilities = dynamic(() => import('../components/utilities')) // Example of another component
const Pin = dynamic(() => import('./components/PinGenerator')) // Example of another component
const Temperature = dynamic(() => import('./components/Temperature')) // Example of another component
const Prime = dynamic(() => import('./components/PrimeNumber')) // Example of another component
const viewMap: Record<string, React.ComponentType> = {
  leap: LeapYear,
  case: TitleCase,
  cart: shoppingCart,
  pin: Pin,
  temp: Temperature,
  prime: Prime,
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
    { href: 'leap', label: 'Leap Year' },
    { href: 'case', label: 'Case Converter' },
    { href: 'cart', label: 'Shopping Cart' },
    { href: 'pin', label: 'PIN Generator' },
    { href: 'temp', label: 'Temperature Converter' },
    { href: 'prime', label: 'Prime Checker' },
    // { href: '/jsPlayground?view=utilities', label: 'Utilities', view: 'utilities' },
  ]

  return (
    <MainPage bg="bg_nebula">
      <div className="text-gray-300 p-4 ">
        {/* <h2 className="text-gray-100">JS Playground</h2> */}
        <div className=" gap-2 ">
          <Reveal direction="left" delay={200}>
            <ViewSwitcher links={links} currentView={currentView} />
          </Reveal>
          <SelectedComponent />
        </div>
      </div>
    </MainPage>
  )
}

export default JsPlayground
