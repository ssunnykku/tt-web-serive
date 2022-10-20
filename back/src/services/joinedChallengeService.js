import { joinedChallenge } from "../models/joinedChallenge";

class joinedChallengeService {
  static async count({ id }) {
    const countJoinedChallenge = await joinedChallenge.count({
      id,
    });
    return countJoinedChallenge;
  }
  static async addChallenge({ id, userId, countUploads, image, description }) {
    const createdChallenge = await joinedChallenge.create({
      id,
      userId,
      countUploads,
      image,
      description,
    });
    return createdChallenge;
  }
  // 인증한 챌린지의 정보 불러오기
  static async findChallenge(challengeId) {
    const challengeInfo = await joinedChallenge.findUnique(challengeId);
    return challengeInfo;
  }

  static async findJoinedChallenges(challengeId) {
    const challengeInfo = await joinedChallenge.findMany(challengeId);
    return challengeInfo;
  }
}

export { joinedChallengeService };
