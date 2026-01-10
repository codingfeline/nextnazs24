'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function BottomLogo() {
  const path = usePathname()

  if (path !== '/contact') return null

  return (
    <div>
      <div className=" bg-cover w-20 h-20 absolute text-white bottom-20 right-4 bg-[url(/nazsnet.png)]"></div>

      <motion.form initial={{ y: -520 }} animate={{ y: 0 }}></motion.form>
    </div>
  )
}
