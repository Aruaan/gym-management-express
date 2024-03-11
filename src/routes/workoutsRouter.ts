import { Router, Response, Request } from "express";
import * as z from 'zod';
import { WorkoutRepository } from "../repositories/WorkoutRepository";
import { MemberRepository } from "../repositories/MemberRepository";
import { workoutSchema } from "./workout-schema";

const router = Router()

router.post('/workouts', async (req: Request, res: Response) => {
  try {
  const parsedWorkout = workoutSchema.parse(req.body)
  const savedWorkout = await WorkoutRepository.createAndSave(parsedWorkout)
  res.status(201).json(savedWorkout)
} catch (error){
  if (error instanceof z.ZodError){
    res.status(400).json({
      message:'Invalid data types',
      errors: error.issues
    })
  } else res.status(500).json({message: 'Error adding workout.'})
}
})

router.get('/workouts', async (req: Request, res: Response) => {
  try {
    const workouts = await WorkoutRepository.findAll()
    res.json(workouts)
  } catch(error) {
    res.status(500).json({message: 'Error fetching workouts.'})
  }
})

router.get('/workouts', async (req: Request, res: Response) => {
  const memberId = req.query.member_id

  if (!memberId) {
    return res.status(204).json({message: 'Member with that id does not exist.'})
  }
  try {
    const workouts = await WorkoutRepository.find({
      where: {member: {id: String (memberId)}}
    })
    res.json({ message: "The member has logged these workouts:", workouts }); 
  } catch (error){
    res.status(500).json({message: "Error fetching this member's workouts."})
  }
})

export default router