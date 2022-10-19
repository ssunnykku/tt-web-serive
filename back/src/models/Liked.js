const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Liked {
  static async createLiked({ likedId, userId, challengeId }) {
    console.log("😉살려주세요❤️🙏🔥");
    console.log("userId:", userId);
    const Liked = await prisma.liked.create({
      data: {
        likedId,
        user: {
          connect: { userId: userId },
        },
        challenge: {
          connect: { challengeId: challengeId },
        },
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
    const likedList = await prisma.liked.findMany({
      where: { userId: userId },
      select: {
        challenge: true,
      },
    });
    console.log("get 모델의 return 값:", likedList[0].challenge.mainImg);
    return likedList;
  }
}

export { Liked };
