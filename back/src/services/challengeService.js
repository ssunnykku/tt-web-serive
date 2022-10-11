const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class challengeService {
  static async addChallenge({
    title,
    description,
    fromDate,
    toDate,
    img,
    createdAt,
    updatedAt,
  }) {
    const newChallenge = {
      title,
      description,
      fromDate,
      toDate,
      img,
      createdAt,
      updatedAt,
    };
    const createdChallenge = await prisma.challenge.create({
      data: {
        newChallenge,
      },
    });
    return createdChallenge;
  }
}
