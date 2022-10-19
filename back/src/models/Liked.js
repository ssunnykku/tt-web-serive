const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Liked {
  static async createLiked({ likedId, userId, challengeId }) {
    console.log("뭐가문제지");
    console.log("userId:", userId);
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
    console.log("get 모델의 userId:", userId);
    const likedList = await prisma.user.findUnique({
      where: { userId: userId },
      include: {
        challengeId: challengeId,
      },
    });
    console.log("get 모델의 return 값:", likedList);
    return likedList;
  }
}

export { Liked };
