import * as z from 'zod';
import { WorkoutType } from '../enums/Workout.enum';
export const workoutSchema = z.object({
    date: z.preprocess((arg) => {
        if (typeof arg == 'string') return new Date(arg);
        return arg;
    }, z.date()),
    memberId: z.string(),
    type: z.nativeEnum(WorkoutType).optional().nullable(),
    notes: z.string().optional().nullable() 
});