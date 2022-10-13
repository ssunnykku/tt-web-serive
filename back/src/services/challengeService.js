import { challengeModel } from "../models/challengeModel";
import { remainingDateMiddleware } from "../middlewares/remainingDateMiddleware";

class challengeService {
  // create/ post(유저별로 수정할 것)
  static async addChallenge({ title, description, fromDate, toDate, img }) {
    const newChallenge = {
      title,
      description,
      fromDate,
      toDate,
      img,
      startRemainingDate: remainingDateMiddleware(fromDate),
      endRemainingDate: remainingDateMiddleware(toDate) * -1,
    };
    const createdChallenge = await challengeModel.create({
      newChallenge,
    });
    return createdChallenge;
  }

  // 전체 불러오기 (get)
  static async getChallenges() {
    const challenges = await challengeModel.findMany();
    return challenges;
  }

  // Get (진행중인 챌린지 전체)
  static async getOngoing() {
    const challenges = await challengeModel.findOngoing();

    return challenges;
  }
  // id 값을 게시물 1개 선택하기(params 값을 이용)
  static async findUniqueId(id) {
    const findId = await challengeModel.findUnique(id);
    if (!findId) {
      const error = new Error("invalid id");
      throw error;
    }
    return findId;
  }
}

export { challengeService };
