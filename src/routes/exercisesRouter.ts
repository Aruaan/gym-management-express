import { Router, Request, Response } from "express";
import { exerciseRepository } from "../repositories/ExerciseRepository";
import { exerciseSchema } from "./exercise-schema";
import * as z from 'zod'
import { generateEntityNotFound } from "../util/utilFunctions";
import { WorkoutRepository } from "../repositories/WorkoutRepository";

const router = Router()

router.post('/exercises', async (req: Request, res: Response) => {
    try {
    const parsedExercise = exerciseSchema.parse(req.body)
    console.log(parsedExercise)
    const savedExercise = await exerciseRepository.createAndSave(parsedExercise)
    res.status(201).json(savedExercise)
  } catch (error){
    if (error instanceof z.ZodError){
      res.status(400).json({
        message:'Invalid data types',
        errors: error.issues
      })
    } else{
      res.status(500).json({message: 'Error adding exercise.'})} 
  }
})

router.get('/exercises', async (req: Request, res: Response) => {
  const workoutId = req.query.workout_id as string
  if (workoutId) {
    const workout = await WorkoutRepository.findById(workoutId)
    if (!workout) return res.status(404).json({message:'Workout not found.'})
  }
  
  try {
    const exercises = await exerciseRepository.findBy(
      {workoutId})
    res.json(exercises);
  } catch (error){
    res.status(500).json({message: "Error fetching exercises in this workout."})
  }
})

router.get('/exercises/:id', async (req:Request, res:Response) => {
  const id = req.params.id
  try {
    const exercise = await exerciseRepository.findById(id)
    if (!exercise) {
      res.status(404).json({message:generateEntityNotFound('Exercise')})
    }
    res.json (exercise)
  } catch (error) {
    res.status(500).json({message: 'Error fetching exercise.'})

  }
})


router.get('/exercises/:id/equipment', async (req:Request, res:Response) =>{
  try {
    const exercise = await exerciseRepository.findById(req.params.id)
    if (!exercise) {res.status(404).json({message:generateEntityNotFound('Exercise')})}
    const equipment = await exerciseRepository.findEquipmentForExercise(exercise!)
    if (!equipment) res.sendStatus(204)
    res.json(equipment)
  } catch (error){
    res.status(500).json({message:'Error fetching equipment that this exercise can be done with'})
  }

})

router.put('/exercises/:id', async (req: Request, res:Response) => {
  const id = req.params.id
  console.log(id)

  const updateData = req.body
  console.log(updateData)

  if (!await exerciseRepository.findById(id)) res.status(404).json({message:generateEntityNotFound('Exercise')})

  try {
    const updateResult = await exerciseRepository.update(id, updateData)
    console.log(updateResult)

    if (!updateResult) res.status(500).json({message: 'Error updating piece of equipment.'})

    res.json({message: 'Piece of equipment updated sucessfully'})
  } catch (error) {
    if (error instanceof z.ZodError){
      res.status(400).json({
        message:'Invalid data types',
        errors: error.issues
      })
    } else res.status(500).json({message: 'Error updating exercise.'})
  }
})

router.delete('/exercises/:id', async (req: Request, res:Response) => {
  const id = req.params.id

  try {
    const exercise = await exerciseRepository.findById(id)
    if (!exercise) res.status(404).json({message:generateEntityNotFound('Exercise')})
  
      const deleteResult = await exerciseRepository.delete(id)
      if (!deleteResult) return res.status(500).json({message: 'Error deleting exercise.'})
      
      res.sendStatus(204)

  } catch (error){
    res.status(500).json({message: 'Error deleting exercise.'})
  }
})

export default router

