import { Router } from "express";
import { challengeService } from "../services/challengeService";
import { addImage } from "../middlewares/addImage";
import { loginRequired } from "../middlewares/loginRequired";
import { dayCountsBetweenTodayAnd } from "../middlewares/dayCountsBetweenTodayAnd";

const challengeRouter = Router();
const upload = addImage("uploads");

// const upload = multer({ dest: "uploads/" });

const multiImg = upload.fields([
  { name: "main", maxCount: 1 },
  { name: "explain", maxCount: 2 },
]);

challengeRouter.post("/", loginRequired, multiImg, async (req, res, next) => {
  try {
    const holdUserId = req.currentUserId;

    const { title, description, fromDate, toDate, method } = req.body;
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
      mainImg: `initial/${mainImg.path}`,
      explainImg: `initial/${explainImgPath}`,
      method,
    });
    if (newChallenge.errorMessage) {
      throw new Error(newChallenge.errorMessage);
    }
    res.status(201).json({ newChallenge });
  } catch (error) {
    next(error);
  }
});

// 에러남
//2. Get (전체) 로그인 필수 X
challengeRouter.get("/", async (req, res) => {
  const result = await challengeService.getChallenges();
  res.status(200).json({ result });
});

//3. Get (선택한 항목 1개)
challengeRouter.get("/mine/:id", loginRequired, async (req, res) => {
  const holdUserId = req.currentUserId;
  const { id } = req.params;

  // 해당 사용자 아이디로 챌린지 정보를 db에서 찾아 업데이트
  const updateChallenge = await challengeService.findUniqueUser(id);

  res.status(200).json({ updateChallenge });
});

// Delete (관리용 코드)
challengeRouter.delete("/:id", loginRequired, async (req, res) => {
  const userId = req.currentUserId;
  const { id } = req.params;
  const foundChallenge = await challengeService.findUniqueId(id);

  const result = await challengeService.deleteOne(id);
  res.status(200).json({ result });
});

// 5. 챌린지 수정
challengeRouter.put("/:id", multiImg, loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const { id } = req.params;
    const { title, description, fromDate, toDate, method } = req.body;

    const image = req.files;
    const mainImg = image.main[0];

    const explainImg = image.explain;
    const explainImgPath = explainImg.map((img) => img.path);

    const titleImg = `${mainImg.path}`;
    const explainImgs = `${explainImgPath}`;
    if (image === undefined) {
      return res.status(400).send("cannot find image.");
    }

    // 새로 입력받은 날짜 기준 개시 전으로 수정 막음
    // startRemainingDate(시작까지 남은 날짜 수) 가져와서 시작한 챌린지 수정 불가하게 막기 구현하기...
    if (dayCountsBetweenTodayAnd(req.body.fromDate) >= 0) {
      return res
        .status(400)
        .send("cannot modify it after the challenge begins.");
    }

    const updatedChallenge = await challengeService.updateChallenge({
      id,
      title,
      description,
      method,
      fromDate,
      toDate,
      titleImg,
      explainImgs,
    });

    res.status(200).json({ updatedChallenge });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// 6. get(1개 불러오기/ login 한 유저꺼 불러오기)
challengeRouter.get("/mine/:id", loginRequired, async (req, res) => {
  const userId = req.currentUserId;

  const { id } = req.params;

  const result = await challengeService.findUniqueId(id);

  res.status(200).json({ result });
});

export { challengeRouter };
