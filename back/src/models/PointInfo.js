const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class PointInfo {
  static async findPointInfo({ userId }) {
    const PointInfoList = await prisma.joinedChallenge.findMany({
      where: {
        userId: userId.userId,
      },
      select: {
        challenges: true,
        createAt: true,
        countUpload: true,
      },
    });
    return PointInfoList;
  }
}

export { PointInfo };
