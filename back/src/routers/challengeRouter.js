import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { challengeService } from "../services/challengeService";

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const prisma = new PrismaClient();
const challengeRouter = Router();

// uploads 폴더 생성
fs.readdir("uploads", (error) => {
  if (error) {
    console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
    // fs.mkdirSync("uploads");
  }
});

// /////// ......얘가문제......///////
// const upload = multer({
//   // 이미지 서버 디스크에 저장
//   storage: multer.diskStorage({
//     destination(req, file, cb) {
//       // 폴더 위치?
//       // 여기서 못 읽어오고 있다.
//       // console.log("///////////////////////////////");
//       // console.log(path.join(__dirname, "uploads"));
//       // cb(null, path.join(__dirname, "uploads"));
//       cb(null, "uploads/");
//     },
//     filename(req, file, cd) {
//       const ext = path.extname(file.originalname);
//       // 파일명 + 날짜 + 확장자명
//       cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
//     },
//   }),
//   limits: { fileSize: 30 * 1024 * 1024 },
// });
// // 하나의 이미지 업로드
// challengeRouter.post("/img", upload.single("img"), (req, res) => {
//   console.log(req.file);
//   res.json({ url: `/img/${req.file.filename}` });
// });

// // create/ post(유저별로 수정할 것)
// const upload2 = multer();
challengeRouter.post("/add", async (req, res, next) => {
  console.log(req);
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

// // Get (진행중인 챌린지 전체) 보류
// challengeRouter.get("/ongoing", async (req, res) => {
//   const result = await challengeService.getOngoing();
//   res.status(200).json({ result });
// });

// Get (선택한 항목 1개)
challengeRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await challengeService.findUniqueId(id);
  res.status(200).json({ result });
});

export { challengeRouter };
