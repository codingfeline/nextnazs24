import Reveal from '@/app/components/Reveal'
import PasswordGenerator from '@/app/password/PasswordGenerator'

const PasswordContainer = () => {
  return (
    <Reveal delay={500}>
      <PasswordGenerator />
    </Reveal>
  )
}

export default PasswordContainer
