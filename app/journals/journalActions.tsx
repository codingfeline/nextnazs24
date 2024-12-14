'use client'

import MyButton from '../components/Button'

const JournalActions = () => {
  return (
    <div className="mb-2">
      <MyButton url="/journals/new" label="New Journal"></MyButton>
    </div>
  )
}

export default JournalActions
