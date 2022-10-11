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
}
export { userChallengeModel };
