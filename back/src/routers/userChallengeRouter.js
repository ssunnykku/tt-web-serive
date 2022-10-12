import { Router } from "express";
import { userChallengeService } from "../services/userChallengeService";

const userChallengeRouter = Router();

// userChallenge
// 진행중 : 전체 데이터에서 참여하기 누른 것들
// 완료 : 전체 데이터에서 기간이 끝난 것. 성공할 경우 따로 표시함
// 기간이 끝난 데이터를 모은 다음 (get, 날짜 이용)

// 2. 끝날짜 - 현재날짜 = 0 : 오늘 종료 (0일 남음) 진행중
//    양수 : 끝날 때 까지 양수 날짜 남음 VVVVVVVVVVVVVVVVVVV 완료 페이지에
//    음수 : 끝난지 음수 날짜 지남 진행중

// 인증: 사진 업로드(게시글 등록)을 기준으로 함
// 성공, 실패의 기준을 없애고 게시물 게시할 시 포인트를 적립해주는 방향으로 고민 (ex) 챌린지 참가 할 시 -50 포인트니까 게시물 등록 할 때마다 +10 주는 식으로)
// 기간의 제한, 최대 포인트 적립금의 제한을 고민

// 내가 만든 챌린지 : user Id 로 조회
// - get(user별), get(개별) post(개설하기)
//Create /userChallenge/add / user별로 수정할 예정
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

// // Put 분리 해줘..
// userChallengeRouter.put("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description, fromDate, toDate, img } = req.body;

//     // const foundChallenge = await prisma.challenge.findUnique({
//     //   where: {
//     //     id: Number(id),
//     //   },
//     // });
//     // if (!foundChallenge) {
//     //   const error = new Error("invalid id");
//     //   throw error;
//     // }
//     // if (!title || !description) {
//     //   const error = new Error("invalid input");
//     //   throw error;
//     // }
//     const updatedChallenge = await prisma.challenge.update({
//       where: {
//         challengeId: Number(id),
//       },
//       data: {
//         title,
//         description,
//         fromDate,
//         toDate,
//         img,
//       },
//     });
//     res.status(200).json({ updatedChallenge });
//   } catch (error) {
//     res.json({ message: error.message });
//   }
// });

// userChallengeRouter.put("/:id", async (res, req) => {
//   const { id } = req.params;
//   const findChallenge = await prisma.challenge.findUnique({
//     where: {
//       challengeId: Number(id),
//     },
//   });
//   if (!findChallenge) {
//     const error = new Error("invalid id");
//     error.status = 400;
//     throw error;
//   }
//   const { title, description, fromDate, toDate, img } = req.body;
//   const result = await findChallenge.update({
//     data: {
//       title,
//       description,
//       fromDate,
//       toDate,
//       img,
//     },
//   });
//   res.status(200).json({ result });
// });

export { userChallengeRouter };
