import { Router } from "express";
import { userChallengeService } from "../services/userChallengeService";

const userChallengeRouter = Router();

userChallengeRouter.post("/add", async (req, res, next) => {
  try {
    const { title, description, fromDate, toDate, img } = req.body;
    const newChallenge = await userChallengeService.addChallenge({
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

// get (user별 불러오기로 수정해야 함)
userChallengeRouter.get("/", async (req, res) => {
  const result = await userChallengeService.getChallenges();
  res.status(200).json({ result });
});

// Delete (유저별로 수정하기)
userChallengeRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const foundChallenge = await userChallengeService.findUniqueId(id);

  const result = await userChallengeService.deleteOne(id);
  res.status(200).json({ result });
});

// Update (유저별로 수정하기)
userChallengeRouter.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, fromDate, toDate, img } = req.body;
    const updatedChallenge = await userChallengeService.updateOne(
      id,
      title,
      description,
      fromDate,
      toDate,
      img
    );
    res.status(200).json({ updatedChallenge });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// get(1개 불러오기)
userChallengeRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await userChallengeService.findUniqueId(id);

  res.status(200).json({ result });
});

export { userChallengeRouter };
