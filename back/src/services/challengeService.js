import { challengeModel } from "../models/challengeModel";

class challengeService {
  // create/ post(유저별로 수정할 것)
  static async addChallenge({ title, description, fromDate, toDate, img }) {
    // remainingDate(남은 날짜)
    const endDay = new Date(toDate);
    const today = new Date();
    const endRemainingDate =
      1 + Math.floor((endDay - today) / (1000 * 60 * 60 * 24));

    // startDate(today-fromDate) (0: 시작 당일 / -: 시작 예정 / +: 시작하고 날짜)
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
  // Get (선택한 항목)
}

export { challengeService };
