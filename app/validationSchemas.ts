import { z } from "zod";

export const JournalSchema = z.object({
  topic: z.string().min(5, 'Topic is required'),
  comment: z.string().min(5, 'Comment is required.')
});

export const DeleteAccessLogsSchema = z.object({
  ids: z.array(z.string().regex(/^[0-9a-f]{24}$/i, 'Invalid id')).min(1).max(500),
})

export const ArticleSchema = z.object({
  title: z.string().trim().min(3, 'Title is required').max(200),
  content: z.string().trim().min(10, 'Content is required.'),
})
