import { Router, Response, Request } from "express";
import * as z from 'zod';
import { equipmentRepository } from "../repositories/EquipmentRepository";
import { equipmentSchema } from "./equipment-schema";
import { generateEntityNotFound } from "../util/utilFunctions";
const router = Router()

router.post('/equipments', async (req: Request, res: Response) => {
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

router.get('/equipments', async (req: Request, res: Response) => {
  try {
    const equipment = await equipmentRepository.findAll()
    res.json(equipment)
  } catch(error) {
    res.status(500).json({message: 'Error fetching pieces of equipment.'})
  }
})

router.get('/equipments/:id', async (req:Request, res:Response) => {
  const id = req.params.id
  try {
    const equipment = await equipmentRepository.findById(id)
    if (!equipment) res.status(404).json({message:generateEntityNotFound('Equipment')})

    res.json (equipment)
  } catch (error) {
    res.status(500).json({message: 'Error fetching equipment.'})

  }
})

router.get('/equipments/:id/exercises', async (req:Request, res:Response) =>{
  try {
    const equipment = await equipmentRepository.findById(req.params.id)
    if (!equipment) res.status(404).json({message:generateEntityNotFound('Equipment')})
    
    const exercises = await equipmentRepository.findExercisesForEquipment(equipment!)
    res.json(exercises)
    
  } catch (error){
    res.status(500).json({message:'Error fetching exercises for this piece of equipment.'})
  }

})

router.delete('/equipments/:id', async (req: Request, res:Response) => {
  const id = req.params.id

  try {
    const equipment = await equipmentRepository.findById(id)
    if (!equipment) return res.status(404).json({message:generateEntityNotFound('Equipment')})
    
    const deleteResult =  await equipmentRepository.delete(id)
    if (!deleteResult) return res.status(500).json({message: 'Error deleting piece of equipment.'})

    res.sendStatus(204)
    
  } catch (error){
    res.status(500).json({message: 'Error deleting piece of equipment.'})
  } 
})


router.put('/equipments/:id', async (req: Request, res:Response) => {
  const id = req.params.id
  const updateData = req.body
  if (!await equipmentRepository.findById(id)) res.status(404).json({message:generateEntityNotFound('Equipment')})

  try {
    const updateResult = await equipmentRepository.update(id, updateData)
    if (!updateResult) res.status(500).json({message: 'Error updating piece of equipment.'})

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