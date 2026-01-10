'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

function Contact() {
  return (
    <main className="grow bg_contact bg-gray-200 flex items-center justify-center p-4">
      <motion.form className="contact " initial={{ y: -50 }} animate={{ y: 0 }}>
        <legend className="pt-3 pb-3 text-2xl text-[#3c6886]">Contact</legend>
        <label htmlFor="">
          Name
          <input type="text" placeholder="Name" />
        </label>
        <label htmlFor="">
          Email
          <input type="email" placeholder="Email" />
        </label>
        <label htmlFor="">
          Message
          <textarea name="mesasge" id="" placeholder="Message"></textarea>
        </label>
        <div className="actions">
          <button>Submit</button>
          <button>Clear</button>
        </div>
        <Image src="/nazsnet.webp" alt="logo" width={'128'} height={'128'} />
      </motion.form>
    </main>
    // <div className="h-content-area flex items-center justify-center m-4">
    // </div>
  )
}

export default Contact
