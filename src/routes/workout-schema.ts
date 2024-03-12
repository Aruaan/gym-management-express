import * as z from 'zod';
import { WorkoutType } from '../enums/Workout.enum';
export const workoutSchema = z.object({
    createdAt: z.date().optional(), 
    memberId: z.string(),
    type: z.nativeEnum(WorkoutType).optional().nullable(),
    notes: z.string().optional().nullable() 
});