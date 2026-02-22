'use client'
import { motion } from 'framer-motion'
import MainPage from '../components/MainPage'
import Reveal from '../components/Reveal'
// import FiveParagraphs from '../components/fiveParagraphs'

function Contact() {
  return (
    <MainPage bg="bg_contact">
      <div className="flex items-center justify-center flex-col p-4 ">
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
        </motion.form>
        {/* <Paginate /> */}
        {/* <FiveParagraphs /> */}

        <Reveal delay="delay-100">
          <p className="m-5 text-white">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque tenetur,
            reprehenderit aliquid quidem architecto deserunt necessitatibus itaque ipsam
            numquam, repellat nostrum cumque porro rem provident cum consequuntur quam
            corrupti! Architecto doloribus nisi eveniet molestiae quam error molestias
            eius, quibusdam delectus? Incidunt sit molestias eos magni soluta unde quo
            beatae pariatur. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Doloremque tenetur, reprehenderit aliquid quidem architecto deserunt
            necessitatibus itaque ipsam numquam, repellat nostrum cumque porro rem
            provident cum consequuntur quam corrupti! Architecto doloribus nisi eveniet
            molestiae quam error molestias eius, quibusdam delectus? Incidunt sit
            molestias eos magni soluta unde quo beatae pariatur. ipsam numquam, repellat
            nostrum cumque porro rem provident cum consequuntur quam corrupti! Architecto
            doloribus nisi eveniet molestiae quam error molestias eius, quibusdam
            delectus? Incidunt sit molestias eos magni soluta unde quo beatae pariatur.
          </p>
        </Reveal>
        <Reveal delay="delay-300">
          <p className="m-5 text-white ">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque tenetur,
            reprehenderit aliquid quidem architecto deserunt necessitatibus itaque ipsam
            numquam, repellat nostrum cumque porro rem provident cum consequuntur quam
            corrupti! Architecto doloribus nisi eveniet molestiae quam error molestias
            eius, quibusdam delectus? Incidunt sit molestias eos magni soluta unde quo
            beatae pariatur.
          </p>
        </Reveal>
        <Reveal delay="delay-500">
          <p className="m-5 text-white ">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque tenetur,
            reprehenderit aliquid quidem architecto deserunt necessitatibus itaque ipsam
            numquam, repellat nostrum cumque porro rem provident cum consequuntur quam
            corrupti! Architecto doloribus nisi eveniet molestiae quam error molestias
            eius, quibusdam delectus? Incidunt sit molestias eos magni soluta unde quo
            beatae pariatur.
          </p>
        </Reveal>
        <Reveal delay="delay-700">
          <p className="m-5 text-white">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque tenetur,
            reprehenderit aliquid quidem architecto deserunt necessitatibus itaque ipsam
            numquam, repellat nostrum cumque porro rem provident cum consequuntur quam
            corrupti! Architecto doloribus nisi eveniet molestiae quam error molestias
            eius, Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque
            tenetur, reprehenderit aliquid quidem architecto deserunt necessitatibus
            itaque ipsam numquam, repellat nostrum cumque porro rem provident cum
            consequuntur quam corrupti! Architecto doloribus nisi eveniet molestiae quam
            error molestias eius, Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. Doloremque tenetur, reprehenderit aliquid quidem architecto deserunt
            necessitatibus itaque ipsam numquam, repellat nostrum cumque porro rem
            provident cum consequuntur quam corrupti! Architecto doloribus nisi eveniet
            molestiae quam error molestias eius, quibusdam delectus? Incidunt sit
            molestias eos magni soluta unde quo beatae pariatur.
          </p>
        </Reveal>
        <Reveal delay="delay-100">
          <p className="m-5 text-white ">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque tenetur,
            reprehenderit aliquid quidem architecto deserunt necessitatibus itaque ipsam
            numquam, repellat nostrum cumque porro rem provident cum consequuntur quam
            corrupti! Architecto doloribus nisi eveniet molestiae quam error molestias
            eius, quibusdam delectus? Incidunt sit molestias eos magni soluta unde quo
            beatae pariatur.
          </p>
        </Reveal>
      </div>
    </MainPage>
    // <div className="h-content-area flex items-center justify-center m-4">
    // </div>
  )
}

export default Contact
