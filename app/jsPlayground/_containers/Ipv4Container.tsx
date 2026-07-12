import Reveal from '@/app/components/Reveal'
import Ipv4Calculator from '../_components/Ipv4Calculator'

const Ipv4Container = () => {
  return (
    <Reveal delay={600}>
      <Ipv4Calculator hideBrains />
    </Reveal>
  )
}

export default Ipv4Container
