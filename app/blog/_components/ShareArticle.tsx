'use client'

import { DropdownMenu } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import type { IconType } from 'react-icons'
import {
  FaEnvelope,
  FaFacebook,
  FaLinkedin,
  FaReddit,
  FaWhatsapp,
  FaXTwitter,
} from 'react-icons/fa6'
import { PiCheck, PiLink, PiShareFat, PiShareNetwork } from 'react-icons/pi'

interface Network {
  name: string
  Icon: IconType
  href: (url: string, title: string) => string
}

const enc = encodeURIComponent

const networks: Network[] = [
  { name: 'X', Icon: FaXTwitter, href: (u, t) => `https://x.com/intent/post?url=${enc(u)}&text=${enc(t)}` },
  { name: 'Facebook', Icon: FaFacebook, href: u => `https://www.facebook.com/sharer/sharer.php?u=${enc(u)}` },
  { name: 'LinkedIn', Icon: FaLinkedin, href: u => `https://www.linkedin.com/sharing/share-offsite/?url=${enc(u)}` },
  { name: 'WhatsApp', Icon: FaWhatsapp, href: (u, t) => `https://wa.me/?text=${enc(`${t} ${u}`)}` },
  { name: 'Reddit', Icon: FaReddit, href: (u, t) => `https://www.reddit.com/submit?url=${enc(u)}&title=${enc(t)}` },
  { name: 'Email', Icon: FaEnvelope, href: (u, t) => `mailto:?subject=${enc(t)}&body=${enc(`${t}\n\n${u}`)}` },
]

// BBC-style "Share" menu: copy link, social networks, and the device's native share sheet when available
const ShareArticle = ({ title }: { title: string }) => {
  // The page URL is only known in the browser (no metadataBase / site URL configured)
  const [url, setUrl] = useState('')
  const [canNativeShare, setCanNativeShare] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setUrl(window.location.href)
    setCanNativeShare(typeof navigator.share === 'function')
  }, [])

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copy this link:', url)
    }
  }

  const nativeShare = () => navigator.share({ title, url }).catch(() => {}) // user cancelled

  const open = (href: string) =>
    href.startsWith('mailto:')
      ? (window.location.href = href)
      : window.open(href, '_blank', 'noopener,noreferrer,width=600,height=600')

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-sm font-medium text-white bg-gray-600 hover:bg-gray-500"
        >
          <PiShareFat aria-hidden /> Share
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>Share this article</DropdownMenu.Label>
        <DropdownMenu.Item
          onSelect={e => {
            e.preventDefault() // keep the menu open so "Copied" is visible
            copyLink()
          }}
        >
          {copied ? <PiCheck aria-hidden /> : <PiLink aria-hidden />}
          {copied ? 'Link copied' : 'Copy link'}
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        {networks.map(({ name, Icon, href }) => (
          <DropdownMenu.Item key={name} onSelect={() => open(href(url, title))}>
            <Icon aria-hidden /> {name}
          </DropdownMenu.Item>
        ))}
        {canNativeShare && (
          <>
            <DropdownMenu.Separator />
            <DropdownMenu.Item onSelect={nativeShare}>
              <PiShareNetwork aria-hidden /> More options…
            </DropdownMenu.Item>
          </>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export default ShareArticle
