import { Router } from "express";
import { joinedChallengeService } from "../services/joinedChallengeService";
import { loginRequired } from "../middlewares/loginRequired";
import { addImage } from "../middlewares/addImage";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const joinedChallengeRouter = Router();
const upload = addImage("uploads");

joinedChallengeRouter.post(
  "/:id",
  loginRequired,
  upload.single("image"),
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;

      const image = req.file.path;

      if (image === undefined) {
        return res.status(400).send("이미지가 존재하지 않습니다.");
      }
      const { id } = req.params;
      const countUpload = await prisma.joinedChallenge.count({
        where: {
          chalngId: Number(id),
        },
      });
      const addedImage = `uploads/${image}`;
      const description = req.body.description;
      const addImage = await joinedChallengeService.addChallenge({
        id,
        userId,
        countUpload,
        addedImage,
        description,
        // challenges,
      });

      res.status(200).json({ addImage });
    } catch (error) {
      next(error);
    }
  }
);

// 참가한 챌린지 사진 추가하기 // 1개 추가..
// joinedChallengeRouter.post(
//   "/:id",
//   loginRequired,
//   upload.single("image"),
//   async (req, res, next) => {
//     try {
//       const userId = req.currentUserId;
//       const image = req.file.path;

//       if (image === undefined) {
//         return res.status(400).send("이미지가 존재하지 않습니다.");
//       }

//       const { id } = req.params;
//       const countUploads = await prisma.joinedChallenge.count({
//         where: {
//           chalngId: Number(id),
//         },
//       });

//       const addImage = await prisma.joinedChallenge.create({
//         data: {
//           countUpload: countUploads,
//           addedImage: `uploads/${image}`,
//           description: req.body.description,
//           challenges: {
//             connect: {
//               challengeId: Number(id),
//             },
//           },
//         },
//       });

//       res.status(200).json({ addImage });
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// challenge 정보
joinedChallengeRouter.get("/info/:challengeId", async (req, res) => {
  try {
    const { challengeId } = req.params;

    // 인증한 사진 관련된 챌린지 정보
    const showChallenge = await prisma.challenge.findUnique({
      where: { challengeId: Number(challengeId) },
    });

    res.status(200).json({ showChallenge });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// 인증 사진들 전체 보여주기
joinedChallengeRouter.get("/:challengeId", async (req, res) => {
  try {
    const { challengeId } = req.params;

    // 해당 챌린지의 인증 정보 전부가져오는 코드
    const showCompletedChallenge = await prisma.joinedChallenge.findMany({
      where: { chalngId: Number(challengeId) },
    });

    res.status(200).json({ showCompletedChallenge });
  } catch (error) {
    res.json({ message: error.message });
  }
});

export { joinedChallengeRouter };
