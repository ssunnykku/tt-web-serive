const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class joinedChallenge {
  static async create({
    id,
    countUpload,
    addedImage,
    description,
    // challenges,
  }) {
    const createdChallenge = await prisma.joinedChallenge.create({
      data: {
        countUpload,
        addedImage,
        description,
        challenges: {
          connect: {
            challengeId: Number(id),
          },
        },
      },
    });
    return createdChallenge;
  }
}

export { joinedChallenge };
