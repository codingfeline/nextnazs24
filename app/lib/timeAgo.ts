import moment from 'moment'

// "a few seconds ago", "an hour ago", "a day ago", "3 months ago"
export const timeAgo = (date: Date) => moment(date).fromNow()
