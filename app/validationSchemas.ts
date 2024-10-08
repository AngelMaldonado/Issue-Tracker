import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1).max(255, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
})

export const patchIssueSchema = z.object({
  title: z
    .string()
    .min(1)
    .max(255, 'Title is required')
    .optional(),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(65535, 'Description is too long')
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, 'Assigned to user is required')
    .max(255)
    .optional()
    .nullable(),
})