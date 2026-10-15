import { dateOptions } from '@/app/components'
import { timeAgo } from '@/app/lib/timeAgo'

// Relative time ("an hour ago") with the full date on hover
const ArticleTime = ({ date, className }: { date: Date; className?: string }) => (
  <time
    dateTime={date.toISOString()}
    title={date.toLocaleString('en-gb', dateOptions)}
    className={`roboto-mono text-sm opacity-70 ${className ?? ''}`}
  >
    {timeAgo(date)}
  </time>
)

export default ArticleTime
