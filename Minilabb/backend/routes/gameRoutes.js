import express from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const route = express.Router();


route.get("/", async(req,res) => {
  const games = await prisma.game.findMany()
  res.json(games)
}
)


route.post("/", async(req,res)=> {
  const game = await prisma.game.create({
      data:{
        isActive: true
      }
  })
  res.json(game)
})


