import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { addImage } from "../middlewares/addImage";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const joinedChallengeRouter = Router();
const upload = addImage("uploads");

// 참가한 챌린지 사진 추가하기 // 1개 추가..
joinedChallengeRouter.post(
  "/:id",
  upload.single("image"),
  async (req, res, next) => {
    try {
      const image = req.file.path;

      if (image === undefined) {
        return res.status(400).send("이미지가 존재하지 않습니다.");
      }

      const { id } = req.params;
      const countUploads = await prisma.joinedChallenge.count({
        where: {
          chalngId: Number(id),
        },
      });

      const addImage = await prisma.joinedChallenge.create({
        data: {
          countUpload: countUploads,
          addedImage: `uploads/${image}`,
          challenges: {
            connect: {
              challengeId: Number(id),
            },
          },
        },
      });

      res.status(200).json({ addImage });
    } catch (error) {
      next(error);
    }
  }
);
// get (인증 페이지 보여주기)
// challenge 전체 정보
joinedChallengeRouter.get("/info/:chalngId", async (req, res) => {
  try {
    const { chalngId } = req.params;

    const showCompletedChallenge = await prisma.joinedChallenge.findMany({
      where: { chalngId: Number(chalngId) },
    });

    const showChallenge = await prisma.challenge.findUnique({
      where: { challengeId: Number(chalngId) },
    });

    // const ChallengeInfo = await prisma.joinedChallenge
    //   .findUnique({
    //     where: { joinedId: Number(joinedId) },
    //   })
    //   .challenges();

    res.status(200).json({ showCompletedChallenge, showChallenge });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// 안된다요....

joinedChallengeRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const showCompletedChallenge = await prisma.challenge.findUnique({
    where: {
      challengeId: Number(id),
      // connect 하고싶어.....
    },
  });
  res.json({ showCompletedChallenge });
});

// 왜 안되죠..
// userChallengeRouter.get("joinedChallenge/:chalngId", async (req, res) => {
//   const { chalngId } = req.params;
//   const showChallenge = await prisma.challenge.findMany({
//     where: {
//       challengeId: Number(chalngId),
//     },
//   });
//   res.json({ showChallenge });
// });

// count (참여 횟수 번호매기기)
// joinedChallengeRouter.get(
//   "/countJoinedChallenge/:chalngId",
//   async (req, res) => {
//     try {
//       const { chalngId } = req.params;
//       const countUploads = await prisma.joinedChallenge.findMany({
//         where: {
//           chalngId: Number(chalngId),
//         },
//       });

//       res.status(200).json({ countUploads });
//     } catch (error) {
//       res.json({ message: error.message });
//     }
//   }
// );

export { joinedChallengeRouter };
