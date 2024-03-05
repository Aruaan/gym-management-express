import express, { Router, Request, Response } from "express";
import connection from "../database";

const router = Router()

interface Member {
  first_name: string;
  last_name: string;
  email: string;
  join_date: Date; 
}

router.post('/members', async (req: Request, res: Response) =>{
    const newMember: Member = req.body
    
    if(!newMember.first_name || !newMember.last_name || !newMember.email || !newMember.join_date){
      return res.status(400).send({message:'Missing required fields!'})
    }

    try {
      const [result] = await (await connection).execute(
        'INSERT INTO member (first_name, last_name, email, join_date) VALUES (?, ?, ?, ?)',
        [newMember.first_name, newMember.last_name, newMember.email, newMember.join_date]
      )
      res.status(201).json({message: 'Member added'})
    }
    catch(error) {
      console.error('Error adding member', error)
      res.status(500).send({message:'Error adding member.'})
    }
})

export default router

