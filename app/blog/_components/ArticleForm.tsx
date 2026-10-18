'use client'

import { AUTHORS, DEFAULT_AUTHOR } from '@/app/blog/authors'
import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'
import { ArticleSchema } from '@/app/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Article } from '@prisma/client'
import { Button, Callout, Container, Flex, Heading, Select, Text, TextField } from '@radix-ui/themes'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import SimpleMDE from 'react-simplemde-editor'
import { z } from 'zod'
import { toLocalInput } from './toLocalInput'

// the form keeps the date as the <input type="datetime-local"> string; converted on submit
const ArticleFormSchema = ArticleSchema.extend({ createdAt: z.string().optional() })
type ArticleFormData = z.infer<typeof ArticleFormSchema>

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
    resolver: zodResolver(ArticleFormSchema),
    defaultValues: {
      title: article?.title,
      content: article?.content,
      author: (AUTHORS as readonly string[]).includes(article?.author ?? '')
        ? (article!.author as ArticleFormData['author'])
        : DEFAULT_AUTHOR,
      createdAt: toLocalInput(article ? new Date(article.createdAt) : new Date()),
    },
  })

  const onSubmit = handleSubmit(async ({ createdAt, ...rest }) => {
    try {
      setSubmitting(true)
      const data = { ...rest, createdAt: createdAt ? new Date(createdAt).toISOString() : undefined }
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
        <Flex align="center" gap="2">
          <Text as="label" size="2" htmlFor="article-author">
            Author
          </Text>
          <Controller
            name="author"
            control={control}
            render={({ field }) => (
              <Select.Root value={field.value} onValueChange={field.onChange}>
                <Select.Trigger id="article-author" />
                <Select.Content>
                  {AUTHORS.map(name => (
                    <Select.Item key={name} value={name}>
                      {name}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            )}
          />
        </Flex>
        <ErrorMessage>{errors.author?.message}</ErrorMessage>
        <Flex align="center" gap="2">
          <Text as="label" size="2" htmlFor="article-date">
            Date
          </Text>
          <TextField.Root id="article-date" type="datetime-local" {...register('createdAt')} />
        </Flex>
        <ErrorMessage>{errors.createdAt?.message}</ErrorMessage>
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
