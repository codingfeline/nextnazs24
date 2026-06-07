'use client'

import { Button, Dialog, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// Press Ctrl+Alt+L anywhere to open a quick sign-in modal.
const SignInShortcut = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && (e.key === 'l' || e.key === 'L')) {
        e.preventDefault()
        setOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Content maxWidth="400px">
        <Dialog.Title>Sign in</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Continue to the sign-in page.
        </Dialog.Description>
        <Flex gap="3" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button asChild>
            <Link href="https://nazs.net/api/auth/signin">Sign in</Link>
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default SignInShortcut
