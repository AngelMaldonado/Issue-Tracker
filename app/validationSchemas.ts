import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1).max(255, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
})
