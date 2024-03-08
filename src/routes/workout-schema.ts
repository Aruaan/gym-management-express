import * as z from 'zod';

export const workoutSchema = z.object({
    date: z.preprocess((arg) => {
        if (typeof arg == 'string') return new Date(arg);
        return arg;
    }, z.date()),
    memberId: z.string(),
    type: z.string().optional().nullable(), 
    notes: z.string().optional().nullable() 
});