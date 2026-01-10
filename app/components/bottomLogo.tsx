'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function BottomLogo() {
  const path = usePathname()

  if (path !== '/contact') return null

  return (
    <div>
      {/* <div className="border  w-20 h-20 absolute text-white bottom-220 right-4 bg_contact">
        test
      </div> */}

      <motion.form initial={{ y: -520 }} animate={{ y: 0, x: -100 }}>
        <div className="absolute bg_contact h-20 w-20 bottom-10 right-8"></div>
      </motion.form>
    </div>
  )
}
