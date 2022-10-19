import { challengeModel } from "../models/challengeModel";
import { dayCountsBetweenTodayAnd } from "../middlewares/dayCountsBetweenTodayAnd";

class challengeService {
  // create/ post(유저별로 수정할 것)
  static async addChallenge({
    holdUserId,
    title,
    description,
    fromDate,
    toDate,
    mainImg,
    explainImg,
  }) {
    const newChallenge = {
      holdUserId,
      title,
      description,
      fromDate,
      toDate,
      startRemainingDate: dayCountsBetweenTodayAnd(fromDate),
      endRemainingDate: dayCountsBetweenTodayAnd(toDate) * -1,
      mainImg,
      explainImg,
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
  // id 값을 게시물 1개 선택하기(params 값을 이용)
  static async findUniqueId(id) {
    const findId = await challengeModel.findUnique(id);
    if (!findId) {
      const error = new Error("invalid id");
      throw error;
    }
    return findId;
  }

  // Delete
  static async deleteOne(id) {
    // const findId = await challengeModel.findFromDate(id);
    // if (dayCountsBetweenTodayAnd(fromDate) >= 0) {
    //   const error = new Error("cannot modify it after the challenge begins.");
    //   throw error;
    // }
    const deleteChallenge = await challengeModel.delete(id);

    return deleteChallenge;
  }

  static async addImage(id, addedImage) {
    const createdChallenge = await challengeModel.create({
      id,
      addedImage,
    });
    return createdChallenge;
  }

  // static async findUniqueUser(userId, id) {
  //   const findUserId = await challengeModel.findUniqueUser(userId, id);
  //   return findUserId;
  // }
}

export { challengeService };
