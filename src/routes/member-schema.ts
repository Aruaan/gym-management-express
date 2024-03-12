import * as z from 'zod'; 

export const memberSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email format'), 
    joinDate: z.date().optional()
});