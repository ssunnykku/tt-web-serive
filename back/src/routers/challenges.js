import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { challengeService } from "../services/challengeService";

const prisma = new PrismaClient();

const challengeRouter = Router();

challengeRouter.post("/post", async (req, res) => {
  const { challengeId, title, description, fromDate, toDate } = req.body;
  const result = await prisma.challenge.create({
    challengeId: challengeId,
    title: title,
    description: description,
    fromDate: fromDate,
    toDate: toDate,
  });
  //   res.json(result);
  res.json(result);
});

challengeRouter.get("/", async (req, res) => {
  const { challengeId, title, description, fromDate, toDate } = req.body;
  const challenges = await prisma.challenge.findMany({
    where: { challengeId, title, description, fromDate, toDate },
  });
  res.json(challenges);
});

// challengeRouter.post("/add", async function (req, res, next) {
//   const challengeId = req.body.challengeId;
//   // const userId = None
//   // const pointId = None
//   const title = req.body.title;
//   const description = req.body.description;
//   const from = req.body.from;
//   const to = req.body.to;
//   const newChallenge = await challengeService.addChallenge({
//     challengeId,
//     title,
//     description,
//     from,
//     to,
//   });
// });

// 등록된 챌린지 리스트를 가지고 오기( 공유 페이지 전체 )
// challengeRouter.get("/", async (req, res, next) => {
//   const challengeId = req.body.challengeId;
//   const title = req.body.title;
//   const description = req.body.description;
//   const from = req.body.from;
//   const to = req.body.to;

//   const updateChallenges = await challengeService.update({
//     challengeId,
//     title,
//     description,
//     from,
//     to,
//   });
// });

export { challengeRouter };
