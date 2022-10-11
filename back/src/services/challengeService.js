import { challengeModel } from "../models/challengeModel";

class challengeService {
  // create/ post(유저별로 수정할 것)

  static async addChallenge({ title, description, fromDate, toDate, img }) {
    const endDate = new Date(toDate);
    const today = new Date();
    const gap = endDate - today;
    const dateGap = Math.floor(gap / (1000 * 60 * 60 * 24));

    const newChallenge = { title, description, fromDate, toDate, img, dateGap };
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
  // Get (선택한 항목)
}

export { challengeService };
