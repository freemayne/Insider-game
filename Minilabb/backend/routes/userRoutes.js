import express from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const route = express.Router();

route.get("/", async(req,res) => {
  const users = await prisma.user.findMany()
  res.json(users)
}
)


route.post("/", async(req,res)=> {
  const user = await prisma.user.create({
      data:{
        username: req.body.username,
        role: ""
      }
  })
  res.json(user)
})


