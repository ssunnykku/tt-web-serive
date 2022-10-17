const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class certificationModel {
  // get (user별 불러오기로 수정해야 함)
  static async getCertification() {
    const challenges = await userChallengeModel.findMany();
    return challenges;
  }
}

export { certificationModel };
