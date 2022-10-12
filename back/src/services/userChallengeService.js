import { userChallengeModel } from "../models/userChallengeModel";

class userChallengeService {
  // challenge 생성 (create)
  static async addChallenge({ title, description, fromDate, toDate, img }) {
    // endRemainingDate(남은 날짜)
    const endDay = new Date(toDate);
    const today = new Date();
    const endRemainingDate =
      1 + Math.floor((endDay - today) / (1000 * 60 * 60 * 24));

    // startRemainingDate(today-fromDate) (0: 시작 당일 / -: 시작 예정 / +: 시작하고 날짜)
    const startDay = new Date(fromDate);
    const startRemainingDate = Math.floor(
      (today - startDay) / (1000 * 60 * 60 * 24)
    );

    const newChallenge = {
      title,
      description,
      fromDate,
      toDate,
      img,
      startRemainingDate,
      endRemainingDate,
    };
    const createdChallenge = await userChallengeModel.create({
      newChallenge,
    });
    return createdChallenge;
  }

  // get (user별 불러오기로 수정해야 함)
  static async getChallenges() {
    const challenges = await userChallengeModel.findMany();
    return challenges;
  }

  // id 값을 게시물 1개 선택하기(params 값을 이용)
  static async findUniqueId(id) {
    const findId = await userChallengeModel.findUnique(id);
    if (!findId) {
      const error = new Error("invalid id");
      throw error;
    }
    return findId;
  }

  // Delete (유저별로 수정)
  static async deleteOne(id) {
    const deleteChallenge = await userChallengeModel.delete(id);

    return deleteChallenge;
  }

  // Update (유저별로 수정하기)
  static async updateOne(id, title, description, fromDate, toDate, img) {
    const updateChallenge = await userChallengeModel.update(
      id,
      title,
      description,
      fromDate,
      toDate,
      img
    );

    return updateChallenge;
  }
}

export { userChallengeService };
