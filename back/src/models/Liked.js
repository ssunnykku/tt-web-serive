const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Liked {
  static async createLiked({ likedId, userId, challengeId }) {
    const Liked = await prisma.liked.create({
      data: {
        likedId,
        userId,
        challengeId,
      },
    });
    return Liked;
  }

  static async removeLiked({ likedId }) {
    await prisma.liked.delete({
      where: { likedId: likedId },
    });
  }
  static async getLikedList({ userId }) {
    const likedList = await prisma.liked.findMany({
      where: { userId: userId },
    });
    return likedList;
  }
}

export { Liked };
