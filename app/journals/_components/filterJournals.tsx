'use client'

import ButtonIcon from '@/app/components/ButtonIcon'
import { Box, Flex, TextField } from '@radix-ui/themes'
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
  return (
    <>
      <Flex my="2">
        <Box width="5">
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
      </Flex>

      {searchTerm !== '' &&
        filtered.map(t => {
          return (
            <div key={t.id}>
              <Flex>
                <ButtonIcon href={`/journals/${t.id}`}>{t.topic}</ButtonIcon>
              </Flex>
            </div>
          )
        })}
    </>
  )
}

export default FilterJournals
