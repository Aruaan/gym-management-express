import { Router, Response, Request } from "express";
import * as z from 'zod';
import { equipmentRepository } from "../repositories/EquipmentRepository";
import { equipmentSchema } from "./equipment-schema";

const router = Router()

router.post('/equipment', async (req: Request, res: Response) => {
  try {
  const parsedEquipment = equipmentSchema.parse(req.body)
  const savedEquipment = await equipmentRepository.createAndSave(parsedEquipment)
  res.status(201).json(savedEquipment)
} catch (error){
  if (error instanceof z.ZodError){
    res.status(400).json({
      message:'Invalid data types',
      errors: error.issues
    })
  } else res.status(500).json({message: 'Error adding equipment.'})
}
})

router.get('/equipment', async (req: Request, res: Response) => {
  try {
    const equipment = await equipmentRepository.findAll()
    res.json(equipment)
  } catch(error) {
    res.status(500).json({message: 'Error fetching pieces of equipment.'})
  }
})

router.get('/equipment/:id', async (req:Request, res:Response) => {
  const id = req.params.id
  try {
    const equipment = await equipmentRepository.findById(id)
    
    if (!equipment) {
      return res.status(204)
    }

    res.json (equipment)
  } catch (error) {
    res.status(500).json({message: 'Error fetching equipment.'})

  }
})

router.get('/equipment/:id/exercises', async (req:Request, res:Response) =>{
  try {
    const equipment = await equipmentRepository.findById(req.params.id)
    if (!equipment) {res.status(204)}
    else {
    const exercises = await equipmentRepository.findExercisesForEquipment(equipment)
    res.json(exercises)
    }
  } catch (error){
    res.status(500).json({message:'Error fetching exercises for this piece of equipment.'})
  }

})

router.delete('/equipment/:id', async (req: Request, res:Response) => {
  const id = req.params.id

  try {
    const equipment = equipmentRepository.findById(id)
    if (!equipment) {
      return res.status(204)
    } else {
      equipmentRepository.delete(id)
      res.json('Piece of equipment sucessfully deleted')
    }
  } catch (error){
    res.status(500).json({message: 'Error deleting piece of equipment.'})
  }
})


router.put('/equipment/:id', async (req: Request, res:Response) => {
  const id = req.params.id
  const updateData = req.body
  if (!equipmentRepository.findById(id)) res.status(204)
  try {
    await equipmentRepository.update(id, updateData)
    res.json({message: 'Piece of equipment updated sucessfully'})
  } catch (error) {
    if (error instanceof z.ZodError){
      res.status(400).json({
        message:'Invalid data types',
        errors: error.issues
      })
    } else res.status(500).json({message: 'Error updating piece of equipment.'})
  }
})

export default router