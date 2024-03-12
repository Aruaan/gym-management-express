import { Router, Request, Response } from "express";
import { exerciseRepository } from "../repositories/ExerciseRepository";
import { exerciseSchema } from "./exercise-schema";
import * as z from 'zod'

const router = Router()

router.post('/exercises', async (req: Request, res: Response) => {
    try {
    const parsedExercise = exerciseSchema.parse(req.body)
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

router.get('/exercises', async (req:Request, res:Response) => {
  try {
    const members = await exerciseRepository.findAll()
    res.json(members)
  } catch (error) {
    res.status(500).json({message: 'Error fetching exercises.'})
  }
})

router.get('/exercises', async (req: Request, res: Response) => {
  const workoutId = req.query.workout_id

  if (!workoutId) {
    return res.status(404).json({message: 'Workout with that ID not found.'})
  }
  try {
    const exercises = await exerciseRepository.find({
      where: {workout: {id: String (workoutId)}}
    })
    res.json({ message: "The workout contained these exercises ", exercises }); 
  } catch (error){
    res.status(500).json({message: "Error fetching this exercises in this workout."})
  }
})

router.get('/exercises/:id', async (req:Request, res:Response) => {
  const id = req.params.id
  try {
    const exercise = await exerciseRepository.findById(id)
    if (!exercise) {
      res.status(404).json('Exercise with that id not found.')
    }
    res.json (exercise)
  } catch (error) {
    res.status(500).json({message: 'Error fetching exercise.'})

  }
})


router.get('/exercises/:id/equipment', async (req:Request, res:Response) =>{
  try {
    const exercises = await exerciseRepository.findById(req.params.id)
    if (!exercises) {res.status(404).json({message:'Exercise with that ID not found.'})}
    const equipment = await exerciseRepository.findEquipmentForExercise(exercises!)
    if (!equipment) res.sendStatus(204)
    res.json(equipment)
  } catch (error){
    res.status(500).json({message:'Error fetching equipment that this exercise can be done with'})
  }

})
router.put('/exercises/:id', async (req: Request, res:Response) => {
  const id = req.params.id
  const updateData = req.body
  if (!await exerciseRepository.findById(id)) res.status(404).json({message: 'Exercise with that id does not exist'})
  try {
    await exerciseRepository.update(id, updateData)
    res.json(updateData)
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
    if (!exercise) {
      return res.status(404).json({message: 'Exercise with that id does not exist'})
    }
      exerciseRepository.delete(id)
      res.sendStatus(204)
  } catch (error){
    res.status(500).json({message: 'Error deleting exercise.'})
  }
})

export default router

