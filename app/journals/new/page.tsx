import { Button, Heading, TextArea, TextField } from '@radix-ui/themes'

const NewJournalPage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <Heading>NewJournalPage</Heading>
      <TextField.Root placeholder="Title" />
      <TextArea placeholder="Story" />
      <Button>Submit Story</Button>
    </div>
  )
}

export default NewJournalPage
