import { Liked } from "../models/Liked";
import { v4 as uuidv4 } from "uuid";

class likedService {
  static async createLiked({ userId, challengeId }) {
    const likedId = uuidv4();
    const addLiked = await Liked.createLiked({ likedId, userId, challengeId });
    return addLiked;
  }

  static async deleteLiked({ likedId }) {
    await Liked.removeLiked({ likedId });
  }

  static async getLiked({ userId }) {
    const getLiked = await Liked.getLikedList({ userId });
    return getLiked;
  }
}

export { likedService };
