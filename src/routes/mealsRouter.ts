import { Router, Response, Request } from "express";
import * as z from 'zod';
import { mealRepository } from "../repositories/MealRepository";
import { MemberRepository } from "../repositories/MemberRepository";
import { generateEntityNotFound } from "../util/utilFunctions";
import { mealSchema } from "./meal-schema";

const router = Router()

router.post('/meals', async (req: Request, res: Response) => {
  try {
  const parsedMeal = mealSchema.parse(req.body)
  const savedMeal = await mealRepository.createAndSave(parsedMeal)
  res.status(201).json(savedMeal)
} catch (error){
  if (error instanceof z.ZodError){
    res.status(400).json({
      message:'Invalid data types',
      errors: error.issues
    })
  } else res.status(500).json({message: 'Error adding meal.'})
}
})

router.get('/meals', async (req: Request, res: Response) => {
  const memberId = req.query.memberId as string
  if (memberId) {
    const member = await MemberRepository.findById(memberId)
    if (!member) return res.status(404).json({message:'Member not found.'})
  }
  try {
    const meals = await mealRepository.findBy(
    {memberId})
    res.json(meals);
  } catch (error){
    res.status(500).json({message: "Error fetching this member's meals."})
  }
})

router.get('/meals/:id', async (req:Request, res:Response) => {
  const id = req.params.id
  try {
    const meal = await mealRepository.findById(id)
    if (!meal) return res.status(404).json({message:generateEntityNotFound('Meal')})

    res.json (meal)
  } catch (error) {
    res.status(500).json({message: 'Error fetching meal.'})

  }
})

router.delete('/meals/:id', async (req: Request, res:Response) => {
  const id = req.params.id
  try {
    const meal = await mealRepository.findById(id)
    if (!meal) return res.status(404).json({message:generateEntityNotFound('Meal')})

    const deleteResult =  await mealRepository.delete(id)
    if (!deleteResult.affected) return res.status(404).json({message:generateEntityNotFound('Meal')})

    res.sendStatus(204)

  } catch (error){
    res.status(500).json({message: 'Error deleting meal.'})
  }
})



router.put('/meals/:id', async (req: Request, res:Response) => {
  const id = req.params.id
  const updateData = req.body
  if (!await mealRepository.findById(id)) return res.status(404).json({message:generateEntityNotFound('Meal')})

  try {

    const updateResult = await mealRepository.update(id, updateData)

    if (!updateResult.affected) return res.status(404).json({message:generateEntityNotFound('Meal')})

    res.json({message: 'Meal updated sucessfully'})

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