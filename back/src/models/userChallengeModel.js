const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class userChallengeModel {
  // create
  static async create({ newChallenge }) {
    const createdChallenge = await prisma.challenge.create({
      data: newChallenge,
    });
    return createdChallenge;
  }
  static async findMany() {
    const challenges = await prisma.challenge.findMany();
    return challenges;
  }
  // (params 값) 게시물 1개 선택
  static async findUnique(id) {
    const challenge = await prisma.challenge.findUnique({
      where: {
        challengeId: Number(id),
      },
    });
    return challenge;
  }
  // Delete (유저별로 수정예정)
  static async delete(id) {
    const challenge = await prisma.challenge.delete({
      where: {
        challengeId: Number(id),
      },
    });
    return challenge;
  }
  // Update (유저별로 수정)
  static async update(id, title, description, fromDate, toDate, img) {
    const challenge = await prisma.challenge.update({
      where: {
        challengeId: Number(id),
      },
      data: { title, description, fromDate, toDate, img },
    });
    return challenge;
  }
}
export { userChallengeModel };
