const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class PointInfo {
  static async findPointInfo({ userId }) {
    // console.log("이게 왜이래", userId);
    const PointInfoList = await prisma.joinedChallenge.findMany({
      where: {
        userId: userId,
      },
      select: {
        challenges: true,
        createAt: true,
        countUpload: true,
        chalngId: true,
        joinedId: true,
      },
    });
    return PointInfoList;
  }
}

export { PointInfo };
