import { Router, Request, Response } from "express";
import { MemberRepository } from "../repositories/MemberRepository";
import { memberSchema } from "./member-schema";
import * as z from 'zod'
import { generateEntityNotFound } from "../util/utilFunctions";

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
  } catch (error) {
    res.status(500).json({message: 'Error fetching members.'})
  }
})

router.get('/members/:id', async (req:Request, res:Response) => {
  const id = req.params.id
  try {
    const member = await MemberRepository.findById(id)
    
    if (!member) {
      return res.status(404).json({message:generateEntityNotFound('Member')})
    }

    res.json (member)
  } catch (error) {
    res.status(500).json({message: 'Error fetching member.'})

  }
})

router.put('/members/:id', async (req: Request, res:Response) => {
  const id = req.params.id
  const updateData = req.body
  if (!await MemberRepository.findById(id)) res.status(404).json({message:generateEntityNotFound('Member')})
  try {
    await MemberRepository.update(id, updateData)
    res.json({message: 'Member updated sucessfully'})
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
    if (!member) return res.status(404).json({message:generateEntityNotFound('Member')})
  
    await MemberRepository.delete(id)
    res.sendStatus(204)
    
  } catch (error){
    res.status(500).json({message: 'Error deleting member.'})
  }
})

export default router

