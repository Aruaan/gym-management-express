import * as z from 'zod'

export const mealSchema = z.object({
  memberId: z.string().uuid(),
  createdAt: z.date().optional(),
  name: z.string().max(40),
  calories: z.number().refine(value => value >= 0, {
    message: 'Calories cannot be negative!'
  }),
  notes: z.string().max(255).optional().nullable()
  
})