import { joinedChallenge } from "../models/joinedChallenge";
import { dayCountsBetweenTodayAnd } from "../middlewares/dayCountsBetweenTodayAnd";

class joinedChallengeService {
  static async addChallenge({
    id,
    countUpload,
    addedImage,
    description,
    // challenges,
  }) {
    const createdChallenge = await challenge.create({
      id,
      countUpload,
      addedImage,
      description,
      //   challenges,
    });
    return createdChallenge;
  }
}

export { joinedChallengeService };
