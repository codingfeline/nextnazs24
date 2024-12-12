import { Button } from '@radix-ui/themes'

const JournalActions = () => {
  return (
    <div className="mb-2">
      <Button asChild>
        <a href="/journals/new">New Journal</a>
      </Button>
    </div>
  )
}

export default JournalActions
