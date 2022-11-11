import { Router } from "express";
import { pointInfoService } from "../services/pointInfoService";
import { loginRequired } from "../middlewares/loginRequired";

const pointInfoRouter = Router();

pointInfoRouter.get("/", loginRequired, async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    const userJoinChallengeList = await pointInfoService.getPointInfo({
      userId,
    });
    res.status(200).send(userJoinChallengeList);
  } catch (error) {
    next(error);
  }
});
export { pointInfoRouter };
