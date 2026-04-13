import TitleCase from '../jsPlayground/_components/ChangeCase'
import LeapYearChecker from '../jsPlayground/_components/leapYear'

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
