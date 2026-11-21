import { z } from "zod";
import { AUTHORS } from "./blog/authors";

export const JournalSchema = z.object({
  topic: z.string().min(5, 'Topic is required'),
  comment: z.string().min(5, 'Comment is required.')
});

// A time range of ISO timestamps: from (inclusive) to (exclusive); either end may be open, not both
export const AccessLogRangeSchema = z
  .object({
    from: z.string().datetime({ offset: true }).optional(),
    to: z.string().datetime({ offset: true }).optional(),
  })
  .refine(r => r.from || r.to, 'Give a start or end date')
  .refine(r => !r.from || !r.to || new Date(r.from) < new Date(r.to), 'Start must be before end')

// Every entry from one IP. Matched exactly as stored, which isn't always a valid address
// (it's taken from request headers, or 'unknown'), so only the length is checked
export const AccessLogIpSchema = z.object({
  ip: z.string().trim().min(1, 'IP is required').max(100),
})

// The ticked rows, everything from one IP, or everything logged within a date range
export const DeleteAccessLogsSchema = z.union([
  z.object({
    ids: z.array(z.string().regex(/^[0-9a-f]{24}$/i, 'Invalid id')).min(1).max(500),
  }),
  AccessLogIpSchema,
  AccessLogRangeSchema,
])

export const ArticleSchema = z.object({
  title: z.string().trim().min(3, 'Title is required').max(200),
  content: z.string().trim().min(10, 'Content is required.'),
  author: z.enum(AUTHORS, { message: 'Choose an author' }),
  // publish date shown on the article; omitted → keeps existing / defaults to now
  createdAt: z.coerce.date({ message: 'Invalid date' }).optional(),
  hidden: z.boolean().optional(),
})
