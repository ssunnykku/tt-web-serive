import { Router } from "express";
import { joinedChallengeService } from "../services/joinedChallengeService";
import { loginRequired } from "../middlewares/loginRequired";
import { addImage } from "../middlewares/addImage";

const fs = require("fs");
const joinedChallengeRouter = Router();
const sharp = require("sharp");

const upload = addImage("uploads");

//1. 참가한 챌린지 사진 추가하기
joinedChallengeRouter.post(
  "/:id",
  loginRequired,
  upload.single("image"),
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const image = req.file.path;
      sharp(image) // 압축할 이미지 경로
        .resize({ width: 600 }) // 비율을 유지하며 가로 크기 줄이기
        .withMetadata() // 이미지의 exif데이터 유지
        .toBuffer((err, buffer) => {
          if (err) throw err;
          // 압축된 파일 새로 저장(덮어씌우기)
          fs.writeFile(image, buffer, (err) => {
            if (err) throw err;
            console.log(image);
          });
        });

      const { description } = req.body;

      // if (image === undefined) {
      //   return res.status(400).send("이미지가 존재하지 않습니다.");
      // }

      const { id } = req.params;
      const countUploads = await joinedChallengeService.count({
        id,
      });

      const addImage = await joinedChallengeService.addChallenge({
        id,
        userId,
        countUploads,
        image,
        description,
      });

      res.status(200).json({ addImage });
    } catch (error) {
      next(error);
    }
  }
);

joinedChallengeRouter.get(
  "/info/:challengeId",
  loginRequired,
  async (req, res) => {
    try {
      const userId = req.currentUserId;
      const { challengeId } = req.params;

      // 인증한 사진 관련된 챌린지 정보
      const showChallenge = await joinedChallengeService.findChallenge(
        challengeId
      );

      res.status(200).json({ showChallenge });
    } catch (error) {
      res.json({ message: error.message });
    }
  }
);

joinedChallengeRouter.get("/:challengeId", loginRequired, async (req, res) => {
  try {
    const userId = req.currentUserId;
    const { challengeId } = req.params;

    // 해당 챌린지의 인증 정보 전부가져오는 코드
    const showCompletedChallenge =
      await joinedChallengeService.findJoinedChallenges(challengeId);

    res.status(200).json({ showCompletedChallenge });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//user별 참가한 챌린지별 포인트 조회(마이페이지)
joinedChallengeRouter.get(
  "/mypage/userToChallengePoint",
  loginRequired,
  async function (req, res, next) {
    try {
      const userId = req.currentUserId;
      const userJoinChallengeList =
        await joinedChallengeService.getUserChallengePoint({ userId });
      res.status(200).send(userJoinChallengeList);
    } catch (error) {
      next(error);
    }
  }
);

export { joinedChallengeRouter };
