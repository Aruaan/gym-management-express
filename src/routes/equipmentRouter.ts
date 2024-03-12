import { Router, Response, Request } from "express";
import * as z from 'zod';
import { equipmentRepository } from "../repositories/EquipmentRepository";
import { equipmentSchema } from "./equipment-schema";

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
    
    if (!equipment) res.status(404).json({message:'Equipment with that id does not exist.'})

    res.json (equipment)
  } catch (error) {
    res.status(500).json({message: 'Error fetching equipment.'})

  }
})

router.get('/equipments/:id/exercises', async (req:Request, res:Response) =>{
  try {
    const equipment = await equipmentRepository.findById(req.params.id)
    if (!equipment) res.status(404).json({message:'Equipment with that id does not exist.'})
    
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
    if (!equipment) res.status(404).json({message:'Equipment with that id does not exist.'})
    equipmentRepository.delete(id)
    res.sendStatus(204)
    
  } catch (error){
    res.status(500).json({message: 'Error deleting piece of equipment.'})
  }
})


router.put('/equipments/:id', async (req: Request, res:Response) => {
  const id = req.params.id
  const updateData = req.body
  if (!await equipmentRepository.findById(id)) res.status(204)
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