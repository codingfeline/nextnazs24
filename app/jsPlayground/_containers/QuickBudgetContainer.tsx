import Reveal from '@/app/components/Reveal'
import QuickBudget from '../_components/QuickBudget'

const QuickBudgetContainer = () => {
  return (
    <Reveal delay={900}>
      <QuickBudget hideBrains />
    </Reveal>
  )
}

export default QuickBudgetContainer
