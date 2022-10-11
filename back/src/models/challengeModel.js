const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class challengeModel {
  static async create({ newChallenge }) {
    const createdChallenge = await prisma.challenge.create({
      data: newChallenge,
    });
    return createdChallenge;
  }
}

export { challengeModel };
