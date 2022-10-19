const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class challengeModel {
  // create/ post(유저별로 수정할 것)
  static async create({ newChallenge }) {
    const createdChallenge = await prisma.challenge.create({
      data: newChallenge,
    });
    return createdChallenge;
  }

  // 전체 불러오기 (get)
  static async findMany() {
    const challenges = await prisma.challenge.findMany();
    return challenges;
  }
  // 진행중인 챌린지만 불러오기 (시작예정인 챌린지 제외되어있음)
  static async findOngoing() {
    const challenges = await prisma.challenge.findMany({
      where: {
        AND: [
          {
            startRemainingDate: {
              gte: Number(0),
            },
          },
          {
            endRemainingDate: {
              gte: Number(0),
            },
          },
        ],
      },
    });
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
}
export { challengeModel };
