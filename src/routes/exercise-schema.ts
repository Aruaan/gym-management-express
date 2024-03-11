import * as z from 'zod';
import { ExerciseType } from '../enums/Exercise.enum';

export const exerciseSchema = z.object({
    workoutId: z.string(),
    createdAt: z.date().optional(),
    name: z.string().max(40),
    type: z.nativeEnum(ExerciseType).nullable().optional(),
    setCount: z.number().int(),  
    repCount: z.number().int(), 
    weight: z.number(), 
    notes: z.string().max(255).nullable().optional(), 
});