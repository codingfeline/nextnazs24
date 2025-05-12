'use client'

import { Button } from '@radix-ui/themes'
import { useState } from 'react'

const CookiesAgreement = () => {
  const [show, setShow] = useState(true)

  return (
    <div
      className={`absolute bottom-24 right-5 w-[50%] bg-blue-600 text-white w-50 p-5 rounded-lg ${
        !show && 'hidden'
      }`}
    >
      <p>
        Our website uses cookies to function. No personal information is used. By
        accessing our website you agree to our use of cookies.
      </p>
      <Button onClick={() => setShow(false)}>Ok</Button>
    </div>
  )
}

export default CookiesAgreement
