import express, { Router, Request, Response } from "express";
import connection from "../database";

const router = Router()

interface Member {
  first_name: string
  last_name: string
  email: string
  join_date: Date
}

router.post('/members', async (req: Request, res: Response) =>{
    const newMember: Member = req.body
    
    if(!newMember.first_name || !newMember.last_name || !newMember.email || !newMember.join_date){
      return res.status(400).send({message:' missing required fields'})
    }

    try {
      const [result] = await (await connection).execute(
        'INSERT INTO member (first_name, last_name, email, join_date) VALUES (?, ?, ?, ?)',
        [newMember.first_name, newMember.last_name, newMember.email, newMember.join_date]
      )
      res.status(201).json({message: 'Member added'})
    }
    catch(error) {
      res.status(500).send({message:'Error adding member.'})
    }
})

router.get('/members', async(req:Request, res:Response) => {
  try{
      const[rows] = await (await connection).execute('SELECT * FROM member')
      res.json(rows)
  } catch(error){
    res.status(500).json({message: "Error fetching members."})
  }
})

router.get('/members/:id', async(req: Request, res: Response) => {
  try {
    const memberId = req.params.id
    const [rows] = await (await connection).execute('SELECT * FROM member WHERE id = ?', [memberId]) as [Member[], any]
    if (rows.length === 0){
      return res.status(404).json({message: 'Id does not exist'})
    }
    const member = rows[0]
    res.json(member)
  } catch(error){
      res.status(500).json({message:"Error fetching member."})
  }
})

router.delete('/members/:id', async(req: Request, res:Response) => {
  try {
    const memberId = req.params.id
    const [rows] = await (await connection).execute('DELETE FROM member WHERE id = ?', [memberId]) as [Member[], any]
    if(rows.length === 0){
      return res.status(404).json({message: 'Id does not exist'})
    }
    res.json({message: "Member sucessfully deleted."})
  }catch(error){
    res.status(500).json({message:'Error deleting member.'})
  }
})
export default router

