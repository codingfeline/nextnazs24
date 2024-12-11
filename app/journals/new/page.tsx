'use client'
import { Button, Heading, TextField } from '@radix-ui/themes'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import SimpleMDE from 'react-simplemde-editor'

interface JournalForm {
  topic: string
  comment: string
}

const NewJournalPage = () => {
  const router = useRouter()
  const { register, control, handleSubmit } = useForm<JournalForm>()
  console.log(register('topic'))

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async data => {
        await axios.post('/api/journals', data)
        router.push('/')
      })}
    >
      <Heading>New Journal</Heading>
      <TextField.Root placeholder="Topic" {...register('topic')} />
      <Controller
        name="comment"
        control={control}
        render={({ field }) => <SimpleMDE placeholder="Comment" {...field} />}
      />
      <Button>Submit Story</Button>
    </form>
  )
}

export default NewJournalPage
