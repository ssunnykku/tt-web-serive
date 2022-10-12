import { userChallengeModel } from "../models/userChallengeModel";

class userChallengeService {
  // challenge 생성 (create)
  static async addChallenge({ title, description, fromDate, toDate, img }) {
    const endDate = new Date(toDate);
    const today = new Date();
    const gap = endDate - today;
    const dateGap = Math.floor(gap / (1000 * 60 * 60 * 24));

    const newChallenge = { title, description, fromDate, toDate, img, dateGap };
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

  // (params 값) 게시물 1개 선택
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
    // const { id } = req.params;
    const deleteChall = await userChallengeModel.delete(id);

    return deleteChall;
  }
}

export { userChallengeService };
