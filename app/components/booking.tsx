import { useState } from 'react'
import Calendar, { TileArgs } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

export default function BookingCalendar() {
  const [date, setDate] = useState<Date>(new Date())

  return (
    <div>
      <h2>Select a booking date</h2>
      <Calendar
        onChange={(value: Date | Date[]) => {
          if (value instanceof Date) {
            setDate(value)
          }
        }}
        value={date}
        tileDisabled={
          ({ date, view }: TileArgs) => view === 'month' && date.getDay() === 1 // Block Mondays
        }
      />
      <p>Selected date: {date.toDateString()}</p>
    </div>
  )
}
