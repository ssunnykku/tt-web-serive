const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

class Point {

  static async findByUserId({ userId }) {
    const points = await prisma.point.findUnique({
      where:{
        userId: Number(userId) ,
      } });
    return points;
  }

  static async update({ userId, updatepoint }) {
    const updatePoint = await prisma.point.update({
      where: {
        userId : Number(userId)
      },
      data: {
        point: updatepoint,
      }
    });
    return updatePoint;
  }

}

export { Point };
