import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { challengeService } from "../services/challengeService";
import { challengeModel } from "../models/challengeModel";

const prisma = new PrismaClient();

const challengeRouter = Router();

//Create
challengeRouter.post("/add", async (req, res, next) => {
  try {
    const { title, description, fromDate, toDate, img } = req.body;
    const newChallenge = await challengeService.addChallenge({
      title,
      description,
      fromDate,
      toDate,
      img,
    });
    if (newChallenge.errorMessage) {
      throw new Error(newChallenge.errorMessage);
    }

    res.status(201).json({ newChallenge });
  } catch (error) {
    next(error);
  }
});

// Get (전체)
challengeRouter.get("/", async (req, res) => {
  const result = await prisma.challenge.findMany();
  res.status(200).json({ result });
});

// Get (선택한 항목)

// Delete
challengeRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const foundChallenge = await prisma.challenge.findUnique({
    where: {
      challengeId: Number(id),
    },
  });

  if (!foundChallenge) {
    const error = new Error("invalid id");
    throw error;
  }

  const result = await prisma.challenge.delete({
    where: {
      challengeId: Number(id),
    },
  });
  res.status(200).json({ result });
});

// Put
challengeRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, fromDate, toDate, img } = req.body;
    // if (!title || !description) {
    //   const error = new Error("invalid input");
    //   throw error;
    // }
    // const foundChallenge = await prisma.challenge.findUnique({
    //   where: {
    //     id: Number(id),
    //   },
    // });

    const updatedChallenge = await prisma.challenge.update({
      where: {
        challengeId: Number(id),
      },
      data: {
        title,
        description,
        fromDate,
        toDate,
        img,
      },
    });
    res.status(200).json({ updatedChallenge });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// challengeRouter.put("/:id", async (res, req) => {
//   const { id } = req.params;
//   const findChallenge = await prisma.challenge.findUnique({
//     where: {
//       challengeId: Number(id),
//     },
//   });
//   if (!findChallenge) {
//     const error = new Error("invalid id");
//     error.status = 400;
//     throw error;
//   }
//   const { title, description, fromDate, toDate, img } = req.body;
//   const result = await findChallenge.update({
//     data: {
//       title,
//       description,
//       fromDate,
//       toDate,
//       img,
//     },
//   });
//   res.status(200).json({ result });
// });

export { challengeRouter };
