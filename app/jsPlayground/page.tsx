import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'JS Playground — Interactive JavaScript Demos & Tools',
  description:
    'A collection of interactive JavaScript demos: leap year checker, case converter, shopping cart, PIN generator, temperature converter, prime checker, Fibonacci, date formatter, FizzBuzz, word unscrambler, Tic Tac Toe, and QR code generator.',
  keywords: [
    'javascript playground', 'leap year', 'case converter', 'PIN generator',
    'temperature converter', 'prime number', 'fibonacci', 'fizzbuzz',
    'word unscrambler', 'tic tac toe', 'QR code generator', 'js demos',
    'interactive tools',
  ],
  openGraph: {
    title: 'JS Playground',
    description:
      'Interactive JavaScript demos and tools — from FizzBuzz to QR code generation, all running in the browser.',
    type: 'website',
  },
}
import MainPage from '../components/MainPage'
import Reveal from '../components/Reveal'
import ViewSwitcher from '../components/ViewSwitcher'
import FizzBuzz from './_components/FizzBuzz'

const LeapYear = dynamic(() => import('./_components/leapYear'))
const TitleCase = dynamic(() => import('./_components/ChangeCase'))
const shoppingCart = dynamic(() => import('./_components/shoppingCart')) // Example of another component
// const Utilities = dynamic(() => import('../_components/utilities')) // Example of another component
const Pin = dynamic(() => import('./_components/PinGenerator'))
const Temperature = dynamic(() => import('./_components/Temperature'))
const Prime = dynamic(() => import('./_components/PrimeNumber'))
const FibonacciPage = dynamic(() => import('./_components/Fibonacci'))
const DateFormatter = dynamic(() => import('./_components/DateFormatter'))
const WordUnscrambler = dynamic(() => import('./_components/WordUnscrambler'))
const TicTacToe = dynamic(() => import('./_components/TicTacToe'))
const QrGenerator = dynamic(() => import('./_components/QrGenerator'))

const viewMap: Record<string, React.ComponentType> = {
  leap: LeapYear,
  case: TitleCase,
  cart: shoppingCart,
  pin: Pin,
  temp: Temperature,
  prime: Prime,
  FibonacciPage,
  DateFormatter,
  FizzBuzz,
  WordUnscrambler,
  TicTacToe,
  QrGenerator,
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
    { href: 'FibonacciPage', label: 'Fibonacci' },
    { href: 'DateFormatter', label: 'Date Formatter' },
    { href: 'FizzBuzz', label: 'FizzBuzz' },
    { href: 'WordUnscrambler', label: 'Word Unscrambler' },
    { href: 'TicTacToe', label: 'Tic Tac Toe' },
    { href: 'QrGenerator', label: 'QR Code Generator' },
    // { href: '/jsPlayground?view=utilities', label: 'Utilities', view: 'utilities' },
  ].sort((a, b) => a.label.localeCompare(b.label))

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
