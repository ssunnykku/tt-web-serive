import { userChallengeModel } from "../models/userChallengeModel";

class userChallengeService {
  // challenge 생성 (create)
  static async addChallenge({ title, description, fromDate, toDate, img }) {
    const newChallenge = { title, description, fromDate, toDate, img };
    const createdChallenge = await userChallengeModel.create({
      newChallenge,
    });
    return createdChallenge;
  }
  static async getChallenges() {
    const challenges = await userChallengeModel.findMany();
    return challenges;
  }
}

export { userChallengeService };
