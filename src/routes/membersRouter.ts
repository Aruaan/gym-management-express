import { Router, Request, Response } from "express";
import { MemberRepository } from "../repositories/MemberRepository";
import { memberSchema } from "./member-schema";
import * as z from 'zod'

const router = Router()

router.post('/members', async (req: Request, res: Response) => {
    try {
    const parsedMember = memberSchema.parse(req.body)
    const savedMember = await MemberRepository.createAndSave(parsedMember)
    res.status(201).json(savedMember)
  } catch (error){
    if (error instanceof z.ZodError){
      res.status(400).json({
        message:'Invalid data types',
        errors: error.issues
      })
    } else res.status(500).json({message: 'Error adding member.'})
  }
})

router.get('/members', async (req:Request, res:Response) => {
  try {
    const members = await MemberRepository.findAll()
    res.json(members)
  } catch(error) {
    res.status(500).json({message: 'Error fetching members.'})
  }
})

router.get('/members/:id', async (req:Request, res:Response) => {
  const id = req.params.id
  try {
    const member = await MemberRepository.findById(id)
    
    if(!member) {
      return res.status(404).json({message: "No member with provided id exists."})
    }

    res.json (member)
  } catch (error) {
    res.status(500).json({message: 'Error fetching member.'})

  }
})

router.put('/members/:id', async (req: Request, res:Response) => {
  const id = req.params.id
  const updateData = req.body

  try {
    const updatedMember = await MemberRepository.update(id, updateData)
    if(!updatedMember) {
      return res.status(404).json({message: "No member with provided id exists."})
    }
    res.json(updatedMember)
  } catch (error) {
    if (error instanceof z.ZodError){
      res.status(400).json({
        message:'Invalid data types',
        errors: error.issues
      })
    } else res.status(500).json({message: 'Error updating member.'})
  }
})

router.delete('/members/:id', async (req: Request, res:Response) => {
  const id = req.params.id

  try {
    const member = MemberRepository.findById(id)
    if(!member) {
      return res.status(404).json({message: "No member with provided id exists."})
    } else {
      MemberRepository.delete(id)
      res.json('Member sucessfully deleted')
    }
  }catch(error){
    res.status(500).json({message: 'Error deleting member.'})
  }
})

export default router

