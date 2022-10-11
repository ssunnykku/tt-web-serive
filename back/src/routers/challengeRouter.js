import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { challengeService } from "../services/challengeService";
import { challengeModel } from "../models/challengeModel";

const prisma = new PrismaClient();
const challengeRouter = Router();

// create/ post(유저별로 수정할 것)
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
  const result = await challengeService.getChallenges();
  res.status(200).json({ result });
});

// Get (선택한 항목)

export { challengeRouter };
