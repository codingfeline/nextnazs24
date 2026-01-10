'use client'

import ButtonIcon from '@/app/components/ButtonIcon'
import { Box, Container, Flex, TextField } from '@radix-ui/themes'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

interface Topics {
  topic: string
  id: string
}

interface Prop {
  topics: Topics[]
}

const FilterJournals = ({ topics }: Prop) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = topics.filter(t =>
    t.topic.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const ShowTopics = () =>
    filtered.map(t => {
      return (
        <div key={t.id} className="w-ful ">
          <Flex my="1" wrap="nowrap">
            <ButtonIcon href={`/journals/${t.id}`}>{t.topic}</ButtonIcon>
          </Flex>
        </div>
      )
    })

  return (
    <div className=" ">
      <Flex my="2" className="place-self-center py-1" direction="column">
        <Container size="3">
          <Box width="5" className="max-w-screen-lg">
            <TextField.Root
              placeholder="find journals…"
              onChange={e => {
                setSearchTerm(e.target.value)
              }}
            >
              <TextField.Slot>
                <FaSearch height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          </Box>
          {searchTerm !== '' && <ShowTopics />}
        </Container>
      </Flex>
    </div>
  )
}

export default FilterJournals
