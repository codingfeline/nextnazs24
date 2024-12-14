import { z } from "zod";

export const JournalSchema = z.object({
  topic: z.string().min(5, 'Topic is required'),
  comment: z.string().min(5, 'Comment is required.')
});
