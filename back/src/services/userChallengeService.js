import { userChallengeModel } from "../models/userChallengeModel";
import { dayCountsBetweenTodayAnd } from "../middlewares/dayCountsBetweenTodayAnd";

class userChallengeService {
  // challenge 생성 (create)
  // static async addChallenge({ title, description, fromDate, toDate, img }) {
  //   const newChallenge = {
  //     title,
  //     description,
  //     fromDate,
  //     toDate,
  //     img,
  //     startRemainingDate: dayCountsBetweenTodayAnd(fromDate),
  //     endRemainingDate: dayCountsBetweenTodayAnd(toDate) * -1,
  //   };
  //   const createdChallenge = await userChallengeModel.create({
  //     newChallenge,
  //   });
  //   return createdChallenge;
  // }

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

  // Delete
  static async deleteOne(id) {
    const deleteChallenge = await userChallengeModel.delete(id);

    return deleteChallenge;
  }

  // Update
  // static async updateOne(id, title, description, fromDate, toDate) {
  //   const updateChallenge = await userChallengeModel.update({
  //     id,
  //     title,
  //     description,
  //     fromDate,
  //     toDate,
  //   });

  //   return updateChallenge;
  // }

  static async addImage(id, addedImage) {
    const createdChallenge = await userChallengeModel.create({
      id,
      addedImage,
    });
    return createdChallenge;
  }
}

export { userChallengeService };
