import { Router, Response, Request } from "express";
import * as z from 'zod';
import { WorkoutRepository } from "../repositories/WorkoutRepository";
import { MemberRepository } from "../repositories/MemberRepository";
import { workoutSchema } from "./workout-schema";
import { generateEntityNotFound } from "../util/utilFunctions";

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
  const memberId = req.query.memberId as string
  if (memberId) {
    const member = await MemberRepository.findById(memberId)
    if (!member) return res.status(404).json({message:'Member not found.'})
  }
  try {
    const workouts = await WorkoutRepository.findBy(
    {memberId})
    res.json(workouts);
  } catch (error){
    res.status(500).json({message: "Error fetching this member's workouts."})
  }
})

router.get('/workouts/:id', async (req:Request, res:Response) => {
  const id = req.params.id
  try {
    const workout = await WorkoutRepository.findById(id)
    if (!workout) return res.status(404).json({message:generateEntityNotFound('Workout')})

    res.json (workout)
  } catch (error) {
    res.status(500).json({message: 'Error fetching workout.'})

  }
})

router.delete('/workouts/:id', async (req: Request, res:Response) => {
  const id = req.params.id
  try {
    const workout = await WorkoutRepository.findById(id)
    if (!workout) return res.status(404).json({message:generateEntityNotFound('Workout')})

    const deleteResult =  await WorkoutRepository.delete(id)
    if (!deleteResult.affected) return res.status(404).json({message:generateEntityNotFound('Workout')})

    res.sendStatus(204)

  } catch (error){
    res.status(500).json({message: 'Error deleting workout.'})
  }
})



router.put('/workouts/:id', async (req: Request, res:Response) => {
  const id = req.params.id
  const updateData = req.body
  if (!await WorkoutRepository.findById(id)) return res.status(404).json({message:generateEntityNotFound('Workout')})

  try {

    const updateResult = await WorkoutRepository.update(id, updateData)

    if (!updateResult.affected) return res.status(404).json({message:generateEntityNotFound('Workout')})

    res.json({message: 'Workout updated sucessfully'})

  } catch (error) {
    if (error instanceof z.ZodError){
      res.status(400).json({
        message:'Invalid data types',
        errors: error.issues
      })
    } else res.status(500).json({message: 'Error updating workout.'})
  }
})

export default router