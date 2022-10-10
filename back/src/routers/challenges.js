import { Router } from "express";
import { PrismaClient } from "@prisma/client";
// import { challengeService } from "../services/challengeService";

const prisma = new PrismaClient();

const challengeRouter = Router();

challengeRouter.post("/add", async (req, res) => {
  try {
    const { title, description, fromDate, toDate, img } = req.body;
    const result = await prisma.challenge.create({
      data: {
        title,
        description,
        fromDate,
        toDate,
        img,
      },
    });
    res.status(201).json({ result });
  } catch (error) {
    next(error);
  }
});

challengeRouter.get("/", async (req, res) => {
  const result = await prisma.challenge.findMany();
  res.status(200).json({ result });
});

challengeRouter.put("/:challengeId", async (res, req) => {
  const id = req.params;
  const { title, description, fromDate, toDate, img } = req.body;
  // const findChallenge = await prisma.challenge.findUnique({
  //   where: {
  //     challengeId: id,
  //   },
  // });
  // if (!findChallenge) {
  //   const error = new Error("invalid id");
  //   error.status = 400;
  //   throw error;
  // }

  const updateChallenge = await prisma.challenge.update({
    where: {
      challengeId: id,
    },
    data: {
      title,
      description,
      fromDate,
      toDate,
      img,
    },
  });
  res.status(200).json({ updateChallenge });
});

export { challengeRouter };
