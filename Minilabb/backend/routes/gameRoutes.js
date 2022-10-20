import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const route = express.Router();

route.get("/", async (req, res) => {
  const game = await prisma.game.findMany();
  res.json(game);
});

route.get("/:id", async (req, res) => {
  const game = await prisma.game.findUnique({
    where: {
      game_id: parseInt(req.params.id),
    },
    select: {
      game_id: true,
      host: true,
      isActive: true,
      gameStart: true,
      user: true,
    },
  });
  res.json(game);
});

route.post("/", async (req, res) => {
  const game = await prisma.game.create({
    data: {
      host: req.params.username,
      isActive: true,
    },
  });
  res.json(game);
});

route.patch("/:id/join", async (req, res) => {
  const game = await prisma.game.update({
    where: {
      game_id: parseInt(req.params.id),
    },
    data: {
      user: {
        connect: {
          username: req.body.username,
        },
      },
    },
  });
});

route.patch("/:id/end", async (req, res) => {
  const game = await prisma.game.update({
    where: {
      game_id: parseInt(req.params.id),
    },
    data: {
      isActive: false,
    },
  });
});

route.patch("/:id/start", async (req, res) => {
  const game = await prisma.game.update({
    where: {
      game_id: parseInt(req.params.id),
    },
    data: {
      gameStart: true,
    },
  });
  res.json(game);
});

export default route;
