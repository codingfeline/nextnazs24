'use client'

import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'
import { ArticleSchema } from '@/app/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Article } from '@prisma/client'
import { Button, Callout, Container, Heading, TextField } from '@radix-ui/themes'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import SimpleMDE from 'react-simplemde-editor'
import { z } from 'zod'

type ArticleFormData = z.infer<typeof ArticleSchema>

const ArticleForm = ({ article }: { article?: Article }) => {
  const router = useRouter()
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(ArticleSchema),
    defaultValues: { title: article?.title, content: article?.content },
  })

  const onSubmit = handleSubmit(async data => {
    try {
      setSubmitting(true)
      const { data: saved } = article
        ? await axios.patch(`/api/articles/${article.id}`, data)
        : await axios.post('/api/articles', data)
      router.push(`/blog/${saved.id}`)
      router.refresh()
    } catch (error) {
      console.log(error)
      setSubmitting(false)
      setError('Unexpected error')
    }
  })

  return (
    <Container p="2">
      {error && (
        <Callout.Root color="red" mb="2">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3 mt-3" onSubmit={onSubmit}>
        <Heading>{article ? 'Edit' : 'New'} Article</Heading>
        <TextField.Root placeholder="Title" {...register('title')} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <div className="bg-gray-50">
          <Controller
            name="content"
            control={control}
            render={({ field }) => <SimpleMDE placeholder="Write your article..." {...field} />}
          />
          <ErrorMessage>{errors.content?.message}</ErrorMessage>
        </div>
        <Button className="theme-surface" disabled={submitting}>
          {article ? 'Update Article' : 'Publish Article'} {submitting && <Spinner />}
        </Button>
      </form>
    </Container>
  )
}

export default ArticleForm
