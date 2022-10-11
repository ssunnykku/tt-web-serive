import { Router } from "express";
import { userChallengeService } from "../services/userChallengeService";
// - get(user별), get(개별) post(개설하기)
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const userChallengeRouter = Router();

//Create /userChallenge/add / user별로 수정할 예정
userChallengeRouter.post("/add", async (req, res, next) => {
  try {
    const { title, description, fromDate, toDate, img } = req.body;
    const newChallenge = await userChallengeService.addChallenge({
      title,
      description,
      fromDate,
      toDate,
      img,
      dateGap,
    });
    if (newChallenge.errorMessage) {
      throw new Error(newChallenge.errorMessage);
    }

    res.status(201).json({ newChallenge });
  } catch (error) {
    next(error);
  }
});

// get (user별 불러오기로 수정해야 함)
userChallengeRouter.get("/", async (req, res) => {
  const result = await userChallengeService.getChallenges();
  res.status(200).json({ result });
});

// Delete (분리해줘...)
userChallengeRouter.delete("/:id", async (req, res) => {
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
userChallengeRouter.put("/:id", async (req, res) => {
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

// userChallengeRouter.put("/:id", async (res, req) => {
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

export { userChallengeRouter };
