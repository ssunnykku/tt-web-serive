import { Router } from "express";
import { challengeService } from "../services/challengeService";
import { addImage } from "../middlewares/addImage";
import { loginRequired } from "../middlewares/loginRequired";
import { dayCountsBetweenTodayAnd } from "../middlewares/dayCountsBetweenTodayAnd";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const upload = addImage("uploads");
const multiImg = upload.fields([
  { name: "main", maxCount: 1 },
  { name: "explain", maxCount: 2 },
]);

const challengeRouter = Router();

challengeRouter.post("/", loginRequired, multiImg, async (req, res, next) => {
  // console.log(req);
  try {
    const holdUserId = req.currentUserId;
    // console.log();
    const { title, description, fromDate, toDate } = req.body;

    const image = req.files;
    const mainImg = image.main[0];

    const explainImg = image.explain;
    const explainImgPath = explainImg.map((img) => img.path);

    if (image === undefined) {
      return res.status(400).send("이미지가 존재하지 않습니다.");
    }

    const newChallenge = await challengeService.addChallenge({
      holdUserId,
      title,
      description,
      fromDate,
      toDate,
      mainImg: `uploads/${mainImg.path}`,
      explainImg: `uploads/${explainImgPath}`,
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

// Get (진행중인 챌린지 전체) 보류
challengeRouter.get("/ongoing", async (req, res) => {
  const result = await challengeService.getOngoing();
  res.status(200).json({ result });
});

// Get (선택한 항목 1개)
challengeRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await challengeService.findUniqueId(id);
  res.status(200).json({ result });
});

// get (user별 불러오기로 수정해야 함) => 아자
challengeRouter.get("/mine", async (req, res) => {
  const id = req.currentUserId;
  const result = await challengeService.getChallenges();
  res.status(200).json({ result });
});

// Delete
// 2. 날짜 조건 걸기 ㅠㅠ 어려웡
challengeRouter.delete("/", loginRequired, async (req, res) => {
  const userId = req.currentUserId;
  const { id } = req.params;
  const foundChallenge = await challengeService.findUniqueId(id);

  const result = await challengeService.deleteOne(id);
  res.status(200).json({ result });
});

challengeRouter.put("/:id", multiImg, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, fromDate, toDate } = req.body;

    const image = req.files;
    const mainImg = image.main[0];

    const explainImg = image.explain;
    const explainImgPath = explainImg.map((img) => img.path);

    if (image === undefined) {
      return res.status(400).send("이미지가 존재하지 않습니다.");
    }

    console.log(explainImgPath);
    const updatedChallenge = await prisma.challenge.update({
      where: {
        challengeId: Number(id),
      },
      data: {
        title,
        description,
        fromDate,
        toDate,
        mainImg: `uploads/${mainImg.path}`,
        explainImg: `uploads/${explainImgPath}`,
        startRemainingDate: dayCountsBetweenTodayAnd(fromDate),
        endRemainingDate: dayCountsBetweenTodayAnd(toDate) * -1,
      },
    });
    res.status(200).json({ updatedChallenge });
    console.log(updatedChallenge);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// get(1개 불러오기/ login 한 유저꺼 불러오기)
challengeRouter.get("/mine/:id", loginRequired, async (req, res) => {
  // const userId = req.currentUserId;

  const { id } = req.params;

  const result = await challengeService.findUniqueId(id);

  res.status(200).json({ result });
});

export { challengeRouter };
