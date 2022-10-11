import { challengeModel } from "../models/challengeModel";


class challengeService {
  // challenge 생성 (create)
  static async addChallenge({ title, description, fromDate, toDate, img }) {
    const newChallenge = { title, description, fromDate, toDate, img };
    const createdChallenge = await challengeModel.create({
      newChallenge,
    });
    return createdChallenge;
  }
  // Get (전체)
    static async getChallenges({
        const challenges = await challengeModel.
    })
}


export { challengeService };
