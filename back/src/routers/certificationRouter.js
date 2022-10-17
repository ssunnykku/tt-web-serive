import { Router } from "express";
import { certificationService } from "../services/certificationService";

// 유저별로 get만 해오면 될듯!

const certificationRouter = Router();

// get (user별 불러오기로 수정해야 함)
userChallengeRouter.get("/", async (req, res) => {
  const result = await certificationService.getPointInfo();
  res.status(200).json({ result });
});

export { certificationRouter };
