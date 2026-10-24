import { z } from "zod";
import { AUTHORS } from "./blog/authors";

export const JournalSchema = z.object({
  topic: z.string().min(5, 'Topic is required'),
  comment: z.string().min(5, 'Comment is required.')
});

// Either the ticked rows, or everything logged before a cut-off (ISO timestamp)
export const DeleteAccessLogsSchema = z.union([
  z.object({
    ids: z.array(z.string().regex(/^[0-9a-f]{24}$/i, 'Invalid id')).min(1).max(500),
  }),
  z.object({ before: z.string().datetime({ offset: true }) }),
])

export const ArticleSchema = z.object({
  title: z.string().trim().min(3, 'Title is required').max(200),
  content: z.string().trim().min(10, 'Content is required.'),
  author: z.enum(AUTHORS, { message: 'Choose an author' }),
  // publish date shown on the article; omitted → keeps existing / defaults to now
  createdAt: z.coerce.date({ message: 'Invalid date' }).optional(),
  hidden: z.boolean().optional(),
})
