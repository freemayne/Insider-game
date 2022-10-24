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
      currentWord: true,
      role: true,
      user: true,
    },
  });
  res.json(game);
});

route.post("/:username/create", async (req, res) => {
  const game = await prisma.game.create({
    data: {
      host: req.params.username,
      isActive: true,
      gameStart: false,
      role: false,
      currentWord: "",
      user: {
        connect: {
          username: req.params.username,
        },
    }},
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
      gameStart: false,
      role: false,
      currentWord: undefined
    },
  });
});

route.patch("/:id/start", async (req, res) => {
  const game = await prisma.game.update({
    where: {
      game_id: parseInt(req.params.id),
    },
    data: {
      isActive: true,
      gameStart: true,
      role: true,
      currentWord: undefined
    },
  });
  res.json(game);
});
route.patch("/:id/word", async (req, res) => {
  const game = await prisma.game.update({
    where: {
      game_id: parseInt(req.params.id),
    },
    data: {
      currentWord: req.body.currentWord
    },
  });
  res.json(game);
});


export default route;
