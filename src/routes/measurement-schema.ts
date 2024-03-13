import * as z from 'zod'

export const measurementSchema = z.object({
  memberId: z.string().uuid(),
  createdAt: z.date().optional(),
  weight: z.number(),
  bodyFatPercentage: z.number().optional().nullable(),
})