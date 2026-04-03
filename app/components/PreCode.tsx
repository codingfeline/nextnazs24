import React from 'react'

interface Props {
  children: React.ReactNode
}
const PreCode = ({ children }: Props) => {
  return (
    <pre>
      <code className="text-sm">{children}</code>
    </pre>
  )
}

export default PreCode
