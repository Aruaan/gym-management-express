import { Router, Response, Request } from "express";
import * as z from 'zod';
import { measurementRepository } from "../repositories/MeasurementRepository";
import { MemberRepository } from "../repositories/MemberRepository";
import { generateEntityNotFound } from "../util/utilFunctions";
import { measurementSchema } from "./measurement-schema";

const router = Router()

router.post('/measurements', async (req: Request, res: Response) => {
  try {
  const parsedMeasurement = measurementSchema.parse(req.body)
  const savedMeasurement = await measurementRepository.createAndSave(parsedMeasurement)
  res.status(201).json(savedMeasurement)
} catch (error){
  if (error instanceof z.ZodError){
    res.status(400).json({
      message:'Invalid data types',
      errors: error.issues
    })
  } else res.status(500).json({message: 'Error adding measurement.'})
}
})

router.get('/measurements', async (req: Request, res: Response) => {
  const memberId = req.query.memberId as string
  if (memberId) {
    const member = await MemberRepository.findById(memberId)
    if (!member) return res.status(404).json({message:'Member not found.'})
  }
  try {
    const measurements = await measurementRepository.findBy(
    {memberId})
    res.json(measurements);
  } catch (error){
    res.status(500).json({message: "Error fetching this member's measurements."})
  }
})

router.get('/measurements/:id', async (req:Request, res:Response) => {
  const id = req.params.id
  try {
    const measurement = await measurementRepository.findById(id)
    if (!measurement) return res.status(404).json({message:generateEntityNotFound('Measurement')})

    res.json (measurement)
  } catch (error) {
    res.status(500).json({message: 'Error fetching measurement.'})

  }
})

router.delete('/measurements/:id', async (req: Request, res:Response) => {
  const id = req.params.id
  try {
    const measurement = await measurementRepository.findById(id)
    if (!measurement) return res.status(404).json({message:generateEntityNotFound('Measurement')})

    const deleteResult =  await measurementRepository.delete(id)
    if (!deleteResult.affected) return res.status(404).json({message:generateEntityNotFound('Measurement')})

    res.sendStatus(204)

  } catch (error){
    res.status(500).json({message: 'Error deleting measurement.'})
  }
})



router.put('/measurements/:id', async (req: Request, res:Response) => {
  const id = req.params.id
  const updateData = req.body
  if (!await measurementRepository.findById(id)) return res.status(404).json({message:generateEntityNotFound('Measurement')})

  try {

    const updateResult = await measurementRepository.update(id, updateData)

    if (!updateResult.affected) return res.status(404).json({message:generateEntityNotFound('Measurement')})

    res.json({message: 'Measurement updated sucessfully'})

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