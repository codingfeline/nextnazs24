'use client'
import { Button, Callout, Heading, TextField } from '@radix-ui/themes'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import SimpleMDE from 'react-simplemde-editor'

interface JournalForm {
  topic: string
  comment: string
}

const NewJournalPage = () => {
  const router = useRouter()
  const [error, setError] = useState('')
  const { register, control, handleSubmit } = useForm<JournalForm>()
  console.log(register('topic'))

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" mb="2">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async data => {
          try {
            await axios.post('/api/journals', data)
            router.push('/')
          } catch (error) {
            setError('Unexpected error')
          }
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
    </div>
  )
}

export default NewJournalPage
