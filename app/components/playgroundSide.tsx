import LeapYearChecker from '../jsPlayground/components/leapYear'
import TitleCase from '../jsPlayground/components/TitleCase'

const PlaygroundSide = () => {
  const compos = [
    { label: 'Leap Year Checker', item: LeapYearChecker },
    { label: 'Case', item: TitleCase },
  ]

  return (
    <ul>
      {compos.map(compo => {
        return <li>{compo.label}</li>
      })}
    </ul>
  )
}

export default PlaygroundSide
