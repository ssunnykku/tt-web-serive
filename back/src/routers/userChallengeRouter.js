import { Router } from "express";
import { userChallengeService } from "../services/userChallengeService";
import { loginRequired } from "../middlewares/loginRequired";
import { addImage } from "../middlewares/addImage";
import { dayCountsBetweenTodayAnd } from "../middlewares/dayCountsBetweenTodayAnd";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const userChallengeRouter = Router();
const upload = addImage("uploads");
const multiImg = upload.fields([
  { name: "main", maxCount: 1 },
  { name: "explain", maxCount: 2 },
]);

// get (user별 불러오기로 수정해야 함) => 은령님?
userChallengeRouter.get("/", async (req, res) => {
  const result = await userChallengeService.getChallenges();
  res.status(200).json({ result });
});

// Delete
// 2. 날짜 조건 걸기 ㅠㅠ 어려웡
userChallengeRouter.delete("/:id", async (req, res) => {
  // const userId = req.currentUserId;
  const { id } = req.params;
  const foundChallenge = await userChallengeService.findUniqueId(id);

  const result = await userChallengeService.deleteOne(id);
  res.status(200).json({ result });
});

// Update
//  "message": "Cannot read properties of undefined (reading 'path')"
// userChallengeRouter.put("/:id", multiImg, async (req, res, next) => {
//   try {
//     const image = req.file.path;

//     if (image === undefined) {
//       return res.status(400).send("이미지가 존재하지 않습니다.");
//     }

//     const { id } = req.params;
//     const { title, description, fromDate, toDate } = req.body;

//     const mainImg = image.main[0];

//     const explainImg = image.explain;
//     const explainImgPath = explainImg.map((img) => img.path);

//     const updatedChallenge = await userChallengeService.updateOne({
//       id,
//       title,
//       description,
//       fromDate,
//       toDate,
//       mainImg: `uploads/${mainImg.path}`,
//       explainImg: `uploads/${explainImgPath}`,
//     });
//     res.status(200).json({ updatedChallenge });
//     console.log(updatedChallenge);
//   } catch (error) {
//     res.json({ message: error.message });
//   }
// });

userChallengeRouter.put("/:id", multiImg, async (req, res, next) => {
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
userChallengeRouter.get("/:id", loginRequired, async (req, res) => {
  const userId = req.currentUserId;
  const { id } = req.params;

  const result = await userChallengeService.findUniqueId(id);

  res.status(200).json({ result });
});

export { userChallengeRouter };
